<?php
require_once('../header.php');
?>

<style type = 'text/css'>
.post-content{
  margin-left:50px;
}
.label-primary{
  margin:2px;
}
.post-metadata{
    padding:5px;
    margin:5px;
}
.label-primary.selected-tag{
  background-color:black !important;
  color:white !important;
}
.post-content{
  clear:both;
  display:block;
}
.post-metadata{
  border-left:5px solid rgba(0,0,0,0.1);
  padding:10px;
  float:left;
}
.content{
margin-left:25px !important;
margin-right:25px !important;
}
#main-header{
  text-align:center;
  margin-bottom:15px;
}

</style>

<link rel = 'import' href = '/htmlets/header.html'>
<body ng-app = 'pblApp'>
<div  class = 'content' ng-controller = 'BlogController'>
  <h1 class = 'main-header' >Berkeley PBL Blog</h1>

  <div ng-show = 'posts != null'>
    <div class = 'col-md-4'>


      <input type = 'text' class = 'form-control' ng-model = 'searchTerm' placeholder = 'Search Blogposts'>

      <div ng-repeat = 'post in posts | filter:searchTerm'>
        <a href = 'javascript:void(0);' ng-click = 'filterPost(post)'>{{post.title}}</a>
      </div>
    </div>
    <!--end of col md 4-->

    <div class = 'col-md-8'>
      <div ng-repeat = 'tag in tags' ng-click = 'filterTags(tag)' class = 'tag label label-primary'>{{tag}}</div>

      <div ng-repeat = 'post in posts | filter:searchTerm'>
        <h2 id = '{{post.id}}'>{{post.title}}</h2>

        <div class = 'post-metadata'>
          <div ng-repeat = 'tag in post.tags' class = 'label label-primary'>{{tag}}</div>
          <div>Author: {{post.author}}</div>
          <div>Timestamp: {{post.timestamp}} </div>
          <div>Can View: {{post.view_permissions}} </div>
          <div>Can Edit: {{post.edit_permissions}} </div>
          <div><a href = '/index.php/editPost?id={{post.objectId}}&type=edit'>Edit Post</a></div>
          <div><a href = '/index.php/emailPost?id={{post.objectId}}'>Email Post</a></div>
          <div><a href = '/index.php/blog?id={{post.objectId}}'>Link to This Post</a></div>
        </div>

        <div class = 'post-content' ng-bind-html = 'post.content | to_trusted'></div>

      </div>
    </div>
  </div>
</div>
</body>
