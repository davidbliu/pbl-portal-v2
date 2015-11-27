
app.controller('BlogController', function($scope, $http, BlogService, UtilService) {
  $scope.tags = BlogService.tags;
  BlogService.allPosts(function(data){
    $scope.posts = data;
    $scope.unfilteredPosts = data;
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

 $scope.filterTags = function(tag){
    $('.tag').each(function(){
      $(this).removeClass('selected-tag');
    });
  if($scope.tagFilter == tag){
    $scope.tagFilter = '';
    $scope.posts = $scope.unfilteredPosts;
  }
   else{
     $scope.tagFilter = tag;
     $scope.posts = [];
      $('.tag').each(function(){
        if($(this).text() == tag){
          $(this).addClass('selected-tag');
        }
      });
      $scope.posts = _.filter($scope.unfilteredPosts, function(x){
        return (x.tags != null && x.tags.indexOf(tag) != -1);
      });
   } 
  };

});
