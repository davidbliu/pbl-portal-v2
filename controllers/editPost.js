
app.controller('EditPostController', function($scope, $http, BlogService, MemberService, UtilService) {
  $scope.editing = false;
  $scope.title = 'Create Blogpost';
  $scope.message = 'edit post';
  $scope.tags = BlogService.tags;
  $scope.permissionsList = BlogService.permissionsList;
  $scope.myEmail = myEmail;
  
  //get post id from url parameter
  UtilService.getParameterByName("id", function(data){
    href = window.location.href.toString();
    if(href.indexOf('create') != -1 || data == null || data == ''){
      post = {};
      post.title = '';
      post.tags = [];
      post.content = '';
      post.view_permissions = 'Only Me';
      post.edit_permissions = 'Only Me';
      post.author = $scope.myEmail;
      post.last_editor = $scope.myEmail;
      $scope.post = post;

    }
    else{
      // pull the blogpost from api server
      $scope.title = 'Edit Blogpost';
      MemberService.me($scope.myEmail, function(meData){
        $scope.me = meData;
        BlogService.getPost(data, function(post){
          //TODO: check for editing permissions first
          if(BlogService.canEditPost($scope.me, post)){
            console.log(post);
            console.log('hi there blog');
            $scope.post = post;
            tinyMCE.activeEditor.setContent(post.content, {format: 'raw'});
            colorTags(post.tags);
            $scope.editing = true;
            $scope.$digest();
          }
          else{
            console.log('no permissions');
            $scope.title = 'You dont have editing permissions to that post';
            post = {};
            post.title = 'No Permissions';
            post.author = $scope.myEmail;
            post.last_editor = $scope.myEmail;
            $scope.post = post;
            $scope.$digest();
          }
        });
      });
    }
  });

  $scope.toggleTag = function(tag){
    tags = $scope.post.tags;
    indexOf = tags.indexOf(tag);
    if(indexOf == -1){
      tags.push(tag);
    }
    else{
      tags = _.filter(tags, function(x){return x != tag});
    }
    $scope.post.tags = tags;
    colorTags($scope.post.tags);
  };

  $scope.deletePost = function(){
    post_id = $scope.post.objectId;
    BlogService.deletePost(post_id, function(data){
      window.location.href = '/htmlets/blog.php';
    });
  };

  $scope.savePost = function(){
    console.log('saving post');
    post = $scope.post;
    post.content = tinyMCE.activeEditor.getContent();
    post.last_editor = $scope.myEmail;
    console.log(post);
    BlogService.savePost(post, function(data){
      console.log('post successfully saved');
      console.log(data);
    });
    //window.location.href = '/htmlets/blog.php';
  };

  $('#save-btn').click(function(){
    savePost();
  });


  function colorTags(tags){
    $('.post-tag').each(function(){
      id = $(this).attr("id").split('-')[0];
      if(tags.indexOf($(this).attr('id').split('-')[0]) != -1 ){
        $(this).addClass('selected-tag');
      }
    });
  };

  tinymce.init({
      selector: "textarea",
      theme: "modern",
      plugins: [
          "advlist autolink lists link image charmap print preview hr anchor pagebreak",
          "searchreplace wordcount visualblocks visualchars code fullscreen",
          "insertdatetime media nonbreaking save table contextmenu directionality",
          "emoticons template paste textcolor colorpicker textpattern imagetools"
      ],
      toolbar1: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image",
      toolbar2: "print preview media | forecolor backcolor emoticons",
      image_advtab: true,
      templates: [
          {title: 'Test template 1', content: 'Test 1'},
          {title: 'Test template 2', content: 'Test 2'}
      ]
  });

});
