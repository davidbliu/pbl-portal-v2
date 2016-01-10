<?php
require_once('../pblPhp/header.php');
require_once('../pblPhp/login.php');
$myEmail = $_COOKIE['myEmail'];
echo '<script>var myEmail = "' . $myEmail . '"</script>';
?>

<style type = 'text/css'>

.folder{
  border:1px solid rgba(0,0,0,0.1);
  padding:5px;
  margin:5px;
}
.card{
  border:1px solid rgba(0,0,0,0.1);
  background-color: rgba(0,0,250, 0.1);
  //background-color: #F6F6F6;
  margin-bottom: 15px;
  padding: 10px;
}
.desc{
  opacity: 0.5;
}
.tag{
  float:left;
  margin:3px;
}
.block{
  display:block;
  clear:both;
}
</style>

<link rel = 'import' href = '/htmlets/header.html'>
<script src = './controllers/forum.js'></script>
<body ng-app = 'pblApp'>

<div  class = 'col-md-8' ng-controller = 'ForumCtrl'>
  <div class = 'card'>
    <h4><a href = './folder.php?folder=Questions'>Questions</a></h4>
    <div>Ask any question</div>
  </div>
  <div class = 'card'>
    <h4><a href = './folder.php?folder=Events'>Events</a></h4>
    <div>Events, logistics, etc</div>
  </div>
  <div class = 'card'>
    <h4><a href = './folder.php?folder=Announcements'>Announcements</a></h4>
    <div>What's important?</div>
  </div>
  <div class = 'card'>
    <h4>Other</h4>
    <div>For everything else...</div>
  </div>
  <div class = 'card'>
    <div class = 'row'>
      <div class = 'left col-md-2'>
        <h4>Archive</h4>
        <div>Browse old posts</div>
      </div>
      <div class = 'col-md-8'>
        <div> <a href = './blog.php'>Fall 2015</a> </div>
        <div> <a href = '#'>Spring 2015</a> </div>
        <div> <a href = '#'>Fall 2014</a> </div>
        <div> <a href = '#'>Spring 2014</a> </div>
        <div> <a href = '#'>Fall 2013</a> </div>
      </div>
    </div>
  </div>
</div>
<!-- end of forum folders -->

<div class = 'col-md-4' ng-controller = 'BlogController'>
  <div class = 'block'>
    <div ng-repeat = 'tag in tags'>
      <div class = 'label label-primary tag'>{{tag}}</div>
    </div>
  </div>
  <h2>Pinned Posts</h2>
  <div class = 'block' ng-repeat = 'post in pinned'>
    <a href = './post.php?id={{post.objectId}}'>{{post.title}}</a>
  </div>
</div>

</body>

