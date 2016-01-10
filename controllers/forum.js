app.controller('ForumCtrl', function($scope, BlogService){
  $scope.message = 'hi';
  BlogService.allPosts(myEmail, function(posts){
    $scope.posts = posts;
    $scope.featuredPosts = _.filter(posts, function(x){
      return x.tags.indexOf('Pin') != -1;
    });
    $scope.$digest();
  });
  $scope.folders = BlogService.folders;
});
