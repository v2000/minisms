ngModule.controller(
    'adminmenucontroller',
    function ($scope,  routerFactory, compileFactory, $location){

        /**
         * Whatever user click check current session
         */
        routerFactory.checkAuthorisedSession();
        /**
         * Menu list
         * @type {Array}
         */
        $scope.menu = [
            {
                url : routerFactory.adminUrl('articles'),
                title : 'Articles',
                current : $location.url() === routerFactory.adminUrl('articles')
            },
            {
                url : routerFactory.adminUrl('categories'),
                title : 'Categories',
                current : $location.url() === routerFactory.adminUrl('categories')
            },
            {
                url : routerFactory.adminUrl('users'),
                title : 'Users',
                current : $location.url() === routerFactory.adminUrl('users')
            }
        ];

        /**
         * Logout app
         * @param $event
         */
        $scope.logout = function($event){
            $event.preventDefault();
            /**
             * Send request
             */
            routerFactory.http({
                url:  routerFactory.serverAdminUrl('deletesession'),
                data : ({sid: CookieHandler.get("sessionid") })
            },  function(res) {

                CookieHandler.clear("sessionid");

                if( angular.isDefined(res.redirect) ){
                    $location.url(res.redirect);
                }else{
                    $location.url("/admin/login");
                }

            });

        }

        /**
         * Check
         * @type {String}
         */
        var current = angular.isDefined( $scope.$parent.$parent.currentMenu ) ? $scope.$parent.$parent.currentMenu : undefined;

        /**
         * Sets current menu
         * @param name
         */
        if( current !== undefined ){
            angular.forEach($scope.menu,function(val){
                if(val.url === routerFactory.adminUrl(current)){
                    val.current = true;
                }
            });
        }
    }
);