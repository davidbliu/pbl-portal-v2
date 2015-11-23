
app.controller('RankingsController', function($scope, $http, MemberService, PointsService, UtilService) {
  MemberService.memberHash(function(data){
    $scope.memberHash = data;
    $scope.$digest();

    PointsService.attendance(function(attendance){
      PointsService.events(function(events){
        eventHash = PointsService.getEventHash(events);
        _.each(attendance, function(a){
          points = 0;
          _.each(a.event_ids, function(eid){
            pts = eventHash[eid].points || 0; 
            points += pts;
          });
          a.points = points;
        });
        attendance = _.sortBy(attendance, function(x){
          return -x.points;
        });
        $scope.attendance = attendance;
        $scope.cmAttendance = _.filter(attendance, function(x){
          return $scope.memberHash[x.member_email].position == 'cm';
        });
        $scope.ofAttendance = _.filter(attendance, function(x){
          return $scope.memberHash[x.member_email].position != 'cm';
        });
        scores = getRankings(attendance, $scope.memberHash);
        $scope.committees = scores[0];
        $scope.committeeScores = scores[1];
        $scope.$digest();
      });
    });

  });
});

function getRankings(attendance, memberHash){
  committeeScores = {};
  seen = [];
  _.each(attendance, function(x){
    committee = memberHash[x.member_email].committee;
    if(seen.indexOf(committee) == -1){
      committeeScores[committee] = [0, 0, 0];
      seen.push(committee);
    }
    score = committeeScores[committee];
    score[0]++;
    score[1] = score[1]+x.points;
    score[2] = score[1]/score[0];
    committeeScores[committee] = score;
  });
  committees = Object.keys(committeeScores);
  committees = _.sortBy(committees, function(x){
    return -committeeScores[x][2];
  });
  return [committees, committeeScores];
}

