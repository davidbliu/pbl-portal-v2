
app.controller('BlogController', function($scope, $http, MemberService, BlogService, UtilService) {
  //myEmail = $('#uname').text();
  myEmail = 'davidbliu@gmail.com';
  //myEmail = 'jhjp0823@berkeley.edu';
  

  //get post id from url parameter
  UtilService.getParameterByName("id", function(data){
    href = window.location.href.toString();
    if(href.indexOf('id') != -1 || data == null || data == ''){
      $scope.searchTerm = data;
    }
  });

  $scope.tags = BlogService.tags;
  MemberService.me(myEmail, function(meData){
    $scope.me = meData;
    console.log($scope.me);
    BlogService.allPosts($scope.me, function(data){
      $scope.posts = data;
      $scope.unfilteredPosts = data;
      $scope.$digest();
    });
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
