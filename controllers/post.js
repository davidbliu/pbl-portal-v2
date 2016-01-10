
app.controller('PostCtrl', function($scope, $http, MemberService, BlogService, UtilService) {
  //$scope.postId= '72SAg7uAk8';
  $scope.msg = 'hi';
  $scope.profileImg = 'http://www.lumineers.me/images/core/profile-image-zabadnesterling.gif';
  
  
  UtilService.getParameterByName('id', function(x){
    $scope.postId = x;
    // get post
    BlogService.getPost($scope.postId, function(post){
      $scope.post = post;
      $scope.$digest();
    });
    //get comments
    BlogService.getComments($scope.postId, function(comments){
      $scope.comments = comments;
      $scope.$digest();
    });
  });

});
