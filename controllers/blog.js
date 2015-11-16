
app.controller('BlogController', function($scope, $http, BlogService, UtilService) {
  $scope.loadingGif = UtilService.loadingGif;
  $scope.loading = false;
  $scope.message = 'hi there from blog controller';
  BlogService.allPosts(function(data){
    $scope.posts = BlogService.convertPosts(data);
    $scope.$digest();
  });
  $scope.filterPost = function(post){
    if($scope.searchTerm != post.title){
      $scope.searchTerm = post.title;
    }
    else{
      $scope.searchTerm = '';
    }
  }
});
