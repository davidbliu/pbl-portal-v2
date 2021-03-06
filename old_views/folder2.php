
<?php
require_once('../pblPhp/header.php');
require_once('../pblPhp/login.php');
$myEmail = $_COOKIE['myEmail'];
echo '<script>var myEmail = "' . $myEmail . '"</script>';
$folderId = $_GET['folder'];
echo '<script>var folderId="'.$folderId.'";</script>';
?>


<link rel = 'import' href = '/htmlets/header.html'>
<style type = 'text/css'>
.post-card{
  background-color:rgba(0,0,250, 0.1);
  padding:5px;
  margin:10px;
}
.post-img{
  height:200px;
}
.post-title>a{
padding:0px !important;
}
</style>

<script src = './controllers/folder.js'></script>
<body ng-app = 'pblApp'>

<div  class = 'content' ng-controller = 'FolderCtrl'>
  <div class = 'col-md-9'>
    <div ng-repeat = 'post in posts' class = 'post-card'>
      <h2 id = '{{post.objectId}}'>{{post.title}}</h2>
      <div> <a href = './post.php?id={{post.objectId}}'>Link to this post</a> </div>
      <div class = 'post-content' ng-bind-html = 'post.content | to_trusted'></div>
    </div>
  </div>

  <div class = 'col-md-3 scrollspy' ng-show = 'posts != null' >
    <ul id = 'nav' class = 'nav hidden-xs hidden-sm affix' data-spy = 'affix'>
      <li ng-repeat = 'post in posts' class = 'post-title'>
        <a href = '#{{post.objectId}}'>{{post.title}}</a>
      </li>
    </nav>
    <div class = 'btn btn-default' ng-click = 'prevPage()'>&lt;</div>
    <div class = 'btn btn-default' ng-click = 'nextPage()'>&gt;</div>
    <div class = 'btn btn-primary' ng-click = 'createPost()'>Start a new discussion </div>
  </div>
</div>
</body>
