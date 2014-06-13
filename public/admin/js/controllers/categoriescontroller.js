/**
 * Created by juliarietveld on 11/06/14.
 */
ngModule.controller(
    'categoriescontroller',
    function ($scope, routerFactory, compileFactory, $location){

        $scope.submenu  = [
            {
                url : routerFactory.adminUrl('categories/add'),
                title : 'Add category',
                current : $location.url() === routerFactory.adminUrl('categories/add')
            }
        ];

        /**
         * myObj
         * @type {Object}
         */
        $scope.myObj = {
            'ID' : 'ID',
            'Title' : 'Title',
            'Short description' : 'Short description',
            'Url': 'Url',
            'Parent category' : 'Parent category',
            'Created' : 'Created',
            'Edit' : 'Edit',
            'Delete' : 'Delete',
            'No records to display' : 'No records to display'
        }


        /***
         * Confirm Deletion
         * @param data
         * @return {Array}
         */
        $scope.confirmDelete = function($event){

            if( $event.preventDefault ){
                $event.preventDefault();
            }else{
                $event.returnValue = false;
            }

            $scope.title = "Are you sure that you want to delete record ??";
            $scope.ok_button_title = "Ok";
            $scope.close_button_title = "Close";
            $scope.ok_confirm_response = function(ev){


                if( ev.preventDefault ){
                    ev.preventDefault();
                }else{
                    ev.returnValue = false;
                }

                /**
                 * Url
                 * @type {*}
                 */
                var url = angular.element($event.target).attr("data-deleteurl");
                /**
                 * Router
                 */
                routerFactory.http({
                    method: 'GET',
                    url:  url
                }, function(res){
                    if(res.refresh){
                        window.location.reload();
                    }
                });


            }
            $scope.close = function(){
                angular.element(document.querySelector("#overlay_wrapper")).removeClass("show");
            }
            compileFactory.compileConfirmOverly( $scope );
        }


        /**
         * Categories
         * @type {null}
         */
        $scope.categories = null;


        /**
         * Watch categories
         */
        $scope.$watch("categories", function(n,o){
            angular.forEach(n,function(val){
                if( angular.isDefined(val.parent_category) ){
                    val.parent = {};
                    angular.forEach(n,function(pval){
                        if(val.parent_category === pval._id){
                            val.parent = pval;
                        }
                    });
                }
            });
        });

        /**
         * Filter and compile data
         * @param data
         * @return {Array}
         */
        var filter = function(data){

            var compileRow = function(row){
                var n = {}, i,date;
                for(i in row){
                    if(row.hasOwnProperty(i)){
                        n[i] = row[i];
                        if( i === "created" ){
                            n.date = moment(parseInt(row[i])).format("DD-MM-YYYY HH:mm:ss");
                        }
                    }
                }

                n.edit_url = routerFactory.adminUrl('categories/add/'+ n._id);
                n.delete_url = routerFactory.serverAdminUrl('categories/delete/'+ n._id);

                return n;
            }

            if( angular.isArray(data) ){
                var len = data.length, i, n = [];
                for(i = 0; i < len; ++i){
                    n.push(compileRow(data[i]));
                }
                return n;
            }

            return [];
        }


        /**
         * List all categories
         * @type {Object}
         */
        routerFactory.http({
            method: 'GET',
            url:  routerFactory.serverAdminUrl("categories/list")
        }, function(res){
            if( res.data && res.data.length > 0 ){
                $scope.categories = filter(res.data);
                angular.element( document.querySelector('table.greed tbody .nodata') ).css("display","none");
            }
        });
    }
);
