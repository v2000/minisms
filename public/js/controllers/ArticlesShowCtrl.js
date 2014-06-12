app.controller("ArticlesShowCtrl", function($scope, $routeParams, Article) {
  $scope.article = Article.show({ id: $routeParams.id });
});