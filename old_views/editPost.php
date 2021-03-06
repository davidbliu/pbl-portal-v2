<?php
require_once('../pblPhp/header.php');
require_once('../pblPhp/login.php');
$myEmail = $_COOKIE['myEmail'];
echo '<script>var myEmail = "' . $myEmail . '"</script>';
?>

<style type = 'text/css'>
#tags{
  margin-top:15px;
  margin-bottom:15px;
}
.label{
  margin:3px;
}
textarea{
  min-height:500px;
}
.selected-tag{
  background-color:black !important;
}
</style>

<link rel = 'import' href = '/htmlets/header.html'>
 <script src = '//tinymce.cachefly.net/4.2/tinymce.min.js'></script>
<script src = '/htmlets/controllers/editPost.js'></script>
<body ng-app = 'pblApp'>
<div ng-controller = 'EditPostController'>
  Editing as {{myEmail}}
  <h2>{{title}}</h2>

  <div class = 'input-group'>
    <span class = 'input-group-addon'>Title</span>
    <input ng-model = 'post.title' type = 'text' placeholder = 'Post Title' class = 'form-control'>
  </div>

  <div class = 'input-group'>
    <span class = 'input-group-addon'>View Permissions</span>
    <select ng-model = 'post.view_permissions' class = 'form-control'>
      <option ng-repeat = 'p in permissionsList' selected = 'selected'>{{p}}</option>
    </select>
  </div>

  <div class = 'input-group'>
    <span class = 'input-group-addon'>Edit Permissions</span>
    <select ng-model = 'post.edit_permissions' class = 'form-control' id = 'edit-permissions'>
      <option ng-repeat = 'p in permissionsList' selected = 'selected'>{{p}}</option>
    </select>
  </div>

  <div id = 'tags'>
    <div ng-repeat = 'tag in tags' ng-click = 'toggleTag(tag)' class = 'post-tag label label-primary' id = '{{tag}}-tag'>{{tag}}</div>
  </div>

  <h2>{{post.title}}</h2>

  <textarea></textarea>
  <button class = 'btn btn-danger' ng-click = 'deletePost()'>Delete Post</button>
  <button class = 'btn btn-primary' ng-click = 'savePost()'>Save Post</button>
</div>
</body>
