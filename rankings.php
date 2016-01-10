<?php
require_once('../pblPhp/header.php');
?>
<link rel = 'import' href = '/htmlets/header.html'>
<body ng-app = 'pblApp'>
  <div ng-controller = 'RankingsController'>
    <h1>Fall 2015 Rankings</h1>
    <div class = 'col-md-4'>
      <h2>Top CMs</h2>
      <div ng-repeat = 'cm in cmAttendance | limitTo:10'>
        {{memberHash[cm.member_email].name}} {{cm.points}}
      </div>
    </div>
    <div class = 'col-md-4'>
      <h2>Top Officers</h2>
      <div ng-repeat = 'of in ofAttendance | limitTo:10'>
        {{memberHash[of.member_email].name}} {{of.points}}
      </div>
    </div>
    <div class = 'col-md-4'>
      <h2>Top Committees</h2>
      <div ng-repeat = 'committee in committees'>
        {{committee}} {{committeeScores[committee][2]}}
      </div>
    </div>
  </div>
</body>
