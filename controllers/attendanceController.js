
app.controller('AttendanceController', function($scope, $http, MemberService, PointsService, UtilService) {
  email = 'davidbliu@gmail.com';
  PointsService.events(function(events){
    $scope.events = events;
    $scope.eventHash = PointsService.getEventHash(events);
    if($scope.emails != null){
      computeAttendance($scope.emails, $scope.eventHash);
    }
    $scope.$digest();
  });
  MemberService.me(email, function(data){
    me = data;
    $scope.me = me;
    MemberService.committeeMembers(me.committee, function(members){
      $scope.committeeMembers = members;
      $scope.emails = members.map(function(x) { return x.email; });
      if($scope.eventHash != null){
        computeAttendance($scope.emails, $scope.eventHash);
      }
      $scope.$digest();
    });
    $scope.$digest();
  });

  function computeAttendance(emails, eventHash){
    q = new Parse.Query(EventMember);
    q.limit(10000);
    q.containedIn('member_email', emails);
    q.find({success: function(data){
      eventMembers = convertEventMembers(data);
      attendance = {};
      for(var i=0;i<emails.length;i++){
        email = emails[i];
        att = [];
        pts = 0;
        ems = _.where(eventMembers, {member_email: email});
        // calculate attendance + points
        for(var j=0;j<ems.length;j++){
          em = ems[j];
          event = eventHash[em.event_id];
          if(event != null){
            att.push(event);
            pts += event.points || 0;
          }
        }
        attendance[email] = {'points': pts, 'attendance': att};
      } 
      $scope.attendance = attendance;
      $scope.$digest();
    }});
  }

  function convertEventMember(pem){
    em = {};
    em.member_email = pem.get('member_email');
    em.event_id = pem.get('event_id');
    em.objectId = pem.id;
    em.type = pem.get('type');
    return em;
  }

  function convertEventMembers(pems){
    ems = [];
    for(var i=0;i<pems.length;i++){
      ems.push(convertEventMember(pems[i]));
    }
    return ems;
  }

});
