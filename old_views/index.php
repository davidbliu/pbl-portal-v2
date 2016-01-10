<?php
require_once('../header.php');
?>

<head>

<script src = '/htmlets/lib/jquery.min.js'></script>
<script src = '/htmlets/lib/underscore-min.js'></script>
<!--angular-->
<script src = '/htmlets/lib/angular.min.js'></script>
<script src = '/htmlets/lib/angular-route.js'></script>

<!--libraries-->
<link rel = 'stylesheet' href = '/htmlets/lib/bootstrap.min.css'>

<script src = '/htmlets/config.js'></script>
<script src = '/htmlets/lib/platform.js'></script>
<script src = '/htmlets/lib/md5.min.js'></script>
<script src = '/htmlets/lib/parse-1.6.7.min.js'></script>

<link rel  = 'stylesheet' href = '/htmlets/main.css'>

<!--app-->
<script src = '/htmlets/app.js'></script>

<!--controllers and services-->
<script src = '/htmlets/auth.js'></script>
<script src = '/htmlets/parse.js'></script>



<script src = '/htmlets/services/utils.js'></script>

<script src = '/htmlets/controllers/points.js'></script>
<script src = '/htmlets/services/points.js'></script>

<script src = '/htmlets/controllers/members.js'></script>
<script src = '/htmlets/services/members.js'></script>


<script src = '/htmlets/controllers/go.js'></script>
<script src = '/htmlets/services/go.js'></script>

<script src = '/htmlets/controllers/blog.js'></script>
<script src = '/htmlets/services/blog.js'></script>

<script src = '/htmlets/controllers/tabling.js'></script>
<script src = '/htmlets/services/tabling.js'></script>

<script src = '/htmlets/controllers/attendance.js'></script>
<script src = '/htmlets/controllers/authController.js'></script>

<script src = '/htmlets/controllers/calendar.js'></script>
<script src = '/htmlets/controllers/rankings.js'></script>

<link rel="stylesheet" href="/htmlets/bower_components/fullcalendar/dist/fullcalendar.css"/>
<body ng-app = 'pblApp'>
<!-- jquery, moment, and angular have to get included before fullcalendar -->
<script type="text/javascript" src="/htmlets/bower_components/moment/min/moment.min.js"></script>
<script type="text/javascript" src="/htmlets/bower_components/angular-ui-calendar/src/calendar.js"></script>
<script type="text/javascript" src="/htmlets/bower_components/fullcalendar/dist/fullcalendar.min.js"></script>
<script type="text/javascript" src="/htmlets/bower_components/fullcalendar/dist/gcal.js"></script>

</head>
<body ng-app = 'pblApp'>
<div ng-view></div>
</body>
