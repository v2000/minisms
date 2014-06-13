/**
 * Created by juliarietveld on 11/06/14.
 */
ngModule.controller(
    'articlescontroller',
    function ($scope, routerFactory, compileFactory, $location){


        $scope.articles = [];

        /**
         * MyObj
         * @type {Object}
         */
        $scope.myObj = {
            'ID' : 'ID',
            'Title' : 'Title',
            'Short description' : 'Short description',
            'Url': 'Url',
            'Category' : 'Category',
            'Created' : 'Created',
            'Edit' : 'Edit',
            'Delete' : 'Delete',
            'No records to display' : 'No records to display'
        }


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

                n.edit_url = routerFactory.adminUrl('articles/add/'+ n._id);
                n.delete_url = routerFactory.serverAdminUrl('articles/delete/'+ n._id);

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
            url:  routerFactory.serverAdminUrl("articles/list")
        }, function(res){
            if( res.data && res.data.length > 0 ){
                $scope.articles = filter(res.data);
                angular.element( document.querySelector('table.listview tbody .nodata') ).css("display","none");
            }
        });

        /**
         * Submenu for articles
         * @type {Array}
         */
        $scope.submenu  = [
            {
                url : routerFactory.adminUrl('articles/add'),
                title : 'Add article',
                current : $location.url() === routerFactory.adminUrl('articles/add')
            }
        ]



        /***
         * Confirm Delition
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
    }
);
