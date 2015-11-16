

app.controller('CreatePostController', function($scope, $http, BlogService, UtilService) {
  $scope.message = 'create a new blogpost here';
  $scope.tags = BlogService.tags;
  $scope.toggleTag = function(tag){
    $('#'+tag+'-tag').addClass('selected');
  } 
  $scope.savePost = function(){
    console.log('saving post'); 
  }


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
