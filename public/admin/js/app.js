/**
 * Created by juliarietveld on 11/06/14.
 */


/**
 * Handle cookies
 * @type {Object}
 */
var CookieHandler = {
    /**
     * CreateCookie
     * @param name
     * @param value
     * @param days
     */
    set : function( name, value, days ){
        if (days) {
            var date = new Date();
            date.setTime( date.getTime() + ( days*24*60*60*1000 ) );
            var expires = "; expires="+date.toGMTString();
        }else{
            var expires = "";
        }
        document.cookie = name+"="+value+expires+"; path=/";
    },
    /**
     * ReadCookie
     * @param name
     * @return {*}
     */
    get : function(name) {
        var cn = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(cn) == 0) return c.substring(cn.length,c.length);
        }
        return null;
    },
    /**
     * Erase cookie
     * @param name
     */
    clear : function( name ) {
        this.set(name,"",-1);
    }
};

var ngModule = angular.module('MiniCMS', [], function($routeProvider, $locationProvider) {

    var homeUrl = '/admin/';
    $routeProvider.
        when(homeUrl + 'error', {
            templateUrl: homeUrl + 'templates/error.jade',
            controller: 'errorcontroller'
        }).
        when(homeUrl + 'login', {
            templateUrl: homeUrl + 'templates/login.jade',
            controller: 'logincontroller'
        }).
        when(homeUrl + 'categories/add/:id', {
            templateUrl: homeUrl + 'templates/categories/add.jade',
            controller: 'categoriesaddcontroller'
        }).
        when(homeUrl + 'categories/add', {
            templateUrl: homeUrl + 'templates/categories/add.jade',
            controller: 'categoriesaddcontroller'
        }).
        when(homeUrl + 'categories', {
            templateUrl: homeUrl + 'templates/categories/index.jade',
            controller: 'categoriescontroller'
        }).

        when(homeUrl + 'articles', {
            templateUrl: homeUrl + 'templates/articles/listview.jade',
            controller: 'articlescontroller'
        }).
        when(homeUrl + 'articles/add', {
            templateUrl: homeUrl + 'templates/articles/add.jade',
            controller: 'articlesaddcontroller'
        }).
        when(homeUrl + 'articles/add/:id', {
            templateUrl: homeUrl + 'templates/articles/add.html',
            controller: 'articlesaddcontroller'
        }).
        when(homeUrl + 'users', {
            templateUrl: homeUrl + 'templates/users/index.jade',
            controller: 'userscontroller'
        }).

        otherwise({
            redirectTo: homeUrl ,
            templateUrl: homeUrl + 'templates/index.jade',
            controller: 'AdminCtrl'
        });

    $locationProvider.html5Mode(true);
});
