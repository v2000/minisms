/**
 * Created by juliarietveld on 11/06/14.
 */
ngModule.factory('routerFactory', ['$http','$location', function($http,$location) {

    /**
     * Return public data
     */
    return {

        port :30000,
        /**
         * Redirect
         * @param url
         */
        url : function(url){
            $location.url(url);
        },
        /**
         * Create server admin url
         * @param $location
         * @param url
         * @return {String}
         */
        serverAdminUrl : function(url){

            var str = "";
            if( angular.isString(url) ){
                str += url;
            }
            return $location.$$protocol + "://" + $location.$$host + ":"+this.port+"/admin/" + str;
        },
        /**
         * Create Admin url
         * @param $location
         * @param url
         * @return {String}
         */
        absAdminUrl : function(url){
            var str = "";
            if( angular.isString(url) ){
                str += url;
            }
            return $location.$$protocol + "://" + $location.$$host + "/admin/" + str;
        },
        /**
         * Create Admin url
         * @param $location
         * @param url
         * @return {String}
         */
        adminUrl : function(url){
            var str = "";
            if( angular.isString(url) ){
                str += url;
            }
            return "/admin/" + str;
        },
        /**
         * Post data
         * @param $http
         * @param $location
         * @param callback
         */
        http : function(settings, callback ){

            var config = {
                method: 'POST',
                url:  null,
                dataType: "json",
                withCredentials : true,
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            config = angular.extend(config,settings);

            if( config.url !== null ){
                $http(config)
                    .success(callback)
                    .error(function() {
                        if( $location.$$url !== "/admin/error" ){
                            $location.url(Router.adminUrl("error"));
                        }
                    });
            }else{
                throw new Error("Url must be entered");
            }


        },
        /**
         * Checks session
         * @param $http
         * @param callback
         */
        checkSession : function( callback ){
            var self = this;
            var config = {
                method: 'POST',
                url:  self.serverAdminUrl("checksession")
            };

            var session = CookieHandler.get("sessionid");

            if( session !== null ){
                config.data = {};
                config.data.sessionid = session;
            }
            this.http(config, callback);
        },
        /**
         * Method wrapper
         * @param $http
         * @param $location
         */
        checkAuthorisedSession : function(){
            this.checkSession(function(res){
                if( angular.isDefined(res.redirect) && $location.url() !== res.redirect && res.isLoggedIn === false ){
                    $location.url(res.redirect);
                }
                if( angular.isDefined(res.isLoggedIn) && res.isLoggedIn === true ){
                    window.user = res.user;
                }
            });
        }
    }
}]);

ngModule.factory('compileFactory', ['$http','$compile', function($http, $compile) {

    /**
     * Return public data
     */
    return {

        /**
         * Compile overly
         * @constructor
         */
        compileErrorOverly : function(scope){

            var templateHTML = '<div id="overlay_bg" ng-click="close()"></div>';
            templateHTML += '<div id="overlay">';
            templateHTML += '<div class="title">{{title}}</div>';
            templateHTML += '<ul>';
            templateHTML += '<li ng-repeat="item in errors">{{item}}</li>';
            templateHTML += '</ul>';
            templateHTML += '<button class="button blackglossyCSSButtonbutton" ng-click="close()">{{close_button_title}}</button>';
            templateHTML += '</div>';

            $compile(angular.element(templateHTML))(scope, function(clonedElement, scope) {
                angular.element(document.querySelector("#overlay_wrapper")).addClass("show").html("").append(clonedElement);
            });
        },
        /**
         * Confirm Overly
         * @param scope
         * @param $compile
         */
        compileConfirmOverly : function(scope){

            var templateHTML = '<div id="overlay_bg" ng-click="close()"></div>';
            templateHTML += '<div id="overlay">';
            templateHTML += '<div class="title">{{title}}</div>';
            templateHTML += '<button class="button blackglossyCSSButtonbutton" ng-click="ok_confirm_response($event)" style="margin-right: 15px">{{ok_button_title}}</button>';
            templateHTML += '<button class="button blackglossyCSSButtonbutton" ng-click="close()">{{close_button_title}}</button>';
            templateHTML += '</div>';

            $compile(angular.element(templateHTML))(scope, function(clonedElement, scope) {
                angular.element(document.querySelector("#overlay_wrapper")).addClass("show").html("").append(clonedElement);
            });
        }
    }
}]);


