/**
 * Created by juliarietveld on 11/06/14.
 */
ngModule.controller(
    'userscontroller',
    function ($scope,routerFactory){

        /**
         * myObj
         * @type {Object}
         */
        $scope.myObj = {
            'ID' : 'ID',
            'Name' : 'Name',
            'Surname' : 'Surname',
            'Username' : 'Username',
            'Email' : 'Email',
            'Created' : 'Created',
            'Edit' : 'Edit',
            'Delete' : 'Delete',
            'No records to display' : 'No records to display'
        }

        /**
         * Initialize
         * @type {null}
         */
        $scope.users = null;

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
                            n.date = moment( parseInt(row[i]) ).format("DD-MM-YYYY HH:mm:ss");
                        }
                    }
                }

                n.edit_url = routerFactory.adminUrl('users/add/'+ n._id);
                n.delete_url = routerFactory.serverAdminUrl('users/delete/'+ n._id);

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
         * Router
         */
        routerFactory.http({
            method: 'GET',
            url:  routerFactory.serverAdminUrl("users/list")
        }, function(res){
            if( res && res.data && res.data.length > 0 ){
                $scope.users = filter(res.data);
                angular.element( document.querySelector('table.listview tbody .nodata') ).css("display","none");
            }
        });

    }
);



