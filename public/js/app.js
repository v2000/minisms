// Declare app level module which depends on services 
var app = angular.module('myApp', ["ngResource"]).config([
  '$routeProvider',
  '$locationProvider',
  function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
      //.otherwise({
      //  redirectTo: "/employees"
      //})
//admin
      .when("/admin-panel", {
        templateUrl: "partials/article.jade",
        controller: "ArticlesIndexCtrl"
      })
     



//visitors
      .when("/articles", {
        templateUrl: "partials/article.jade",
        controller: "ArticlesIndexCtrl"
      })
      .when("/articles/new", {
        templateUrl: "partials/edit.jade",
        controller: "ArticlesEditCtrl"
      })
      .when("/articles/new/:depId", {
        templateUrl: "partials/edit.jade",
        controller: "ArticlesEditCtrl"
      })
      .when("/articles/:id", {
        templateUrl: "partials/showArticle.jade",
        controller: "ArticlesShowCtrl"
      })
      .when("/articles/category/:id", {
        templateUrl: "partials/showCategory.jade",
        controller: "ArticlesCategoryCtrl"
      })
      .otherwise({
        redirectTo: "/articles"
      });
    }
]);
