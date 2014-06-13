app.controller("ArticlesCategoryCtrl", function($scope, $routeParams, $location, ArticleCategory, Category) {

  $scope.category = Category.show({ id: $routeParams.id });

  $scope.articles = ArticleCategory.index({ id: $routeParams.id });

  $scope.new = function() {
    $location.path("/articles/new/" + $routeParams.id);
  };
});