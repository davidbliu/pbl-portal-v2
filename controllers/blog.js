
app.controller('BlogController', function($scope, $http, BlogService, UtilService) {
  $scope.loadingGif = UtilService.loadingGif;
  $scope.loading = false;
  $scope.message = 'hi there from blog controller';
  function init(){
    BlogService.allPosts(function(data){
      $scope.posts = data;
    });
  }
  init();
  $scope.filterPost = function(post){
    if($scope.searchTerm != post.title){
      $scope.searchTerm = post.title;
    }
    else{
      $scope.searchTerm = '';
    }
  }
});
