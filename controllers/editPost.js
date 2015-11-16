
app.controller('EditPostController', function($scope, $http, BlogService, UtilService) {
  $scope.editing = false;
  $scope.title = 'Create Blogpost';
  $scope.message = 'edit post';
  $scope.tags = BlogService.tags;
  $scope.permissionsList = BlogService.permissionsList;

  //get post id from url parameter
  UtilService.getParameterByName("id", function(data){
    href = window.location.href.toString();
    if(href.indexOf('createPost') != -1 || data == null || data == ''){
      console.log('there is not post');
      post = {};
      post.title = '';
      post.tags = [];
      post.content = '';
      post.permissions = 'Anyone';
      $scope.post = post;
    }
    else{
      // pull the blogpost from api server
      $scope.title = 'Edit Blogpost';
      BlogService.getPost(data, function(post){
        $scope.post = post;
        //set tinymce content
        tinyMCE.activeEditor.setContent(post.content, {format: 'raw'});
        // color tags
        colorTags(post.tags);
        $scope.editing = true;
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
      tags.remove(indexOf);
    }
    $scope.post.tags = tags;
    colorTags($scope.post.tags);
  };

  $scope.deletePost = function(){
    post_id = $scope.post.objectId;
    console.log('deleting post '+post_id);
    BlogService.deletePost(post_id, function(data){
      console.log(data);
      console.log('post deleted');
      window.location.href = '/#/blog';
    });
  };

  function savePost(){
    console.log('saving post');
    post = $scope.post;
    post.content = tinyMCE.activeEditor.getContent();
    BlogService.savePost(post, function(data){
      console.log('post successfully saved');
      console.log(data);
    });
    window.location.href = '/#/blog';
  };

  $('#save-btn').click(function(){
    savePost();
  });

  function colorTags(tags){
    $('.post-tag').each(function(){
      id = $(this).attr("id").split('-')[0];
      console.log(id);
      if(tags.indexOf($(this).attr('id').split('-')[0]) != -1 ){
        $(this).addClass('selected');
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
