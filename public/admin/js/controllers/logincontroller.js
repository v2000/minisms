/**
 * Created by juliarietveld on 11/06/14.
 */
ngModule.controller(
    'logincontroller',
    function ($scope, routerFactory, compileFactory){
        $scope.translations = {
            'Username' : 'Username',
            'Password' : 'Password',
            'Enter your username' : 'Enter your username',
            'Enter your password' : 'Enter your password',
            'Login' : 'Login'
        }



        routerFactory.checkSession(function(res){
            if( angular.isDefined(res.redirect) && angular.isDefined(res.isLoggedIn) && res.isLoggedIn === true ){
                window.user = res.user;
                routerFactory.url(res.redirect);
            }
        });


        $scope.login = function(){
            var form = document.getElementById("login"),
                username = form.querySelector('input[name="username"]'),
                password = form.querySelector('input[name="password"]');

            /**
             * Login request
             */
            routerFactory.http({
                url : routerFactory.serverAdminUrl("authenticate/login"),
                data :  ({username : username.value, password : password.value})
            }, function(res) {

                if( angular.isDefined(res.data) ){
                    CookieHandler.set("sessionid",res.sessionID,1);
                    routerFactory.url("/admin");
                }else{
                    $scope.title = "Ups something is wrong :)";
                    $scope.close_button_title = "Close";
                    $scope.errors = res.translations;
                    $scope.close = function(){
                        angular.element(document.querySelector("#overlay_wrapper")).removeClass("show");
                    }
                    compileFactory.compileErrorOverly( $scope );
                }

            });

        }


    }
);
