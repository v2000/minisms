app.controller("ArticlesIndexCtrl", function($scope, $location, Article, Category, Department) {
  $scope.articles = Article.index();
  $scope.categories = Category.index();


   $scope.newArticle = function() {
    $location.path("/articles/new");
  };
});