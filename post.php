
<?php
require_once('../pblPhp/header.php');
require_once('../pblPhp/login.php');
$myEmail = $_COOKIE['myEmail'];
echo '<script>var myEmail = "' . $myEmail . '"</script>';
?>

<style type = 'text/css'>
.post-row{
  padding:5px;
  border:1px solid rgba(0,0,0,0.1);
  margin:5px;
  background-color:rgba(0,0,250, 0.1);
  margin-bottom:15px;
}
.profile{
  width: 100%;
}

</style>

<link rel = 'import' href = './header.html'>
<script src = './controllers/post.js'></script>

<body ng-app = 'pblApp'>
<div class = 'asdf'  ng-controller = 'PostCtrl'>
  <div class = 'btn btn-primary'>Post Reply</div>  
  <div class = 'row post-row'>
    <div class = 'col-md-2'>
      <div>{{post.author}}</div>
      <div>{{post.createdAt}}</div>
      <img src = '{{profileImg}}' class = 'profile'/>
    </div>
    <div class = 'col-md-7'>
      <h2>Post: {{post.title}}</h2>
      <div class = 'post-content' ng-bind-html = 'post.content | to_trusted'></div>
    </div>
  </div>
  <div class = 'card' ng-repeat = 'comment in comments'>
    <div class = 'row post-row'>
      <div class = 'col-md-2'>
        <div>{{comment.author}}</div>
        <div>{{comment.createdAt}}</div>
        <img src = '{{profileImg}}' class = 'profile'/>
      </div>
      <div class = 'col-md-7'>
        <div class = 'comment-content' ng-bind-html = 'comment.content | to_trusted'></div>
      </div>
    </div>
  </div>
</div>
</body>
