
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
  <div>
    <div ng-repeat = 'post in posts' class = 'post-card'>
      <div id = '{{post.objectId}}'>
        <a href = './post.php?id={{post.objectId}}'>{{post.title}}</a></div>
    </div>
  </div>

</div>
</body>
