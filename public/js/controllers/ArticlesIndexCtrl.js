app.controller("ArticlesIndexCtrl", function($scope, $location, Article, Category) {
  $scope.articles = Article.index();
  $scope.categorys = Category.index();


   $scope.newArticle = function() {
    $location.path("/articles/new");
  };
});