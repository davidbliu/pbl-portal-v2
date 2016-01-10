var page = 0;
app.controller('FolderCtrl', function($scope, BlogService){
  //folderId is set (see folder.php)
  $scope.folder = folderId;
  $scope.message = 'hi';
  function getPosts(page){
    q = new Parse.Query(BlogPost);
    q.equalTo('folder', $scope.folder);
    q.limit(15);
    q.skip(page * 15);
    q.find({
      success:function(posts){
        $scope.posts = convertPosts(posts);
        $scope.$digest();
      }
    });
  }
  getPosts(page);

  $scope.nextPage = function(){
    if($scope.posts.length > 0){
      page = page + 1;
      getPosts(page);
    }
  }
  $scope.prevPage = function(){
    page = page -1;
    if(page < 0){
      page = 0;
    }
    getPosts(page);
  }
  $scope.createPost = function(){
    alert('not implemented');
  };
});
$('#nav').affix({
    offset: {
        top: $('#nav').offset().top
    }
});
