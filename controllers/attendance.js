app.controller('AttendanceController', function($scope, $http, MemberService, PointsService, UtilService) {
  email = 'davidbliu@gmail.com';
  PointsService.events(function(events){
    $scope.events = events;
    $scope.eventHash = PointsService.getEventHash(events);
    if($scope.emails != null){
      computeMarkAttendance($scope.emails, $scope.events);
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
        computeMarkAttendance($scope.emails, $scope.events);
      }
      $scope.$digest();
    });
    $scope.$digest();
  });

  function getType(){
    return 'chair';
  }
  $scope.recordAttendance = function($event, email, event_id){
    console.log($event.target);
    type = getType();
    q = new Parse.Query(EventMember);
    q.equalTo('member_email', email);
    q.equalTo('event_id', event_id);
    q.find({success:function(data){
      ems = data
      if(ems.length == 0){
        em = new EventMember();
      }
      else{
        em = ems[0];
        // destroy excess event members
        for(var i=1;i<ems.length;i++){
          em.destroy();
        }
        //flip flop type
        type = em.get('type');
        if(type == 'chair'){
          type = 'none';
        }
        else{
          type = 'chair'
        }
      }
      em.set('member_email', email);
      em.set('event_id', event_id);
      em.set('type', type);
      em.save(null, {
        success:function(data){
          console.log('saved');
          $($event.target).removeClass('chair-record');
          $($event.target).removeClass('cm-record');
          $($event.target).addClass(type+'-record');
        }
      });
    }});
  }
  /*
   * for chairs to mark attendahce
   */

  function computeMarkAttendance(emails, events){
    q = new Parse.Query(EventMember);
    q.limit(10000);
    q.containedIn('member_email', emails);
    q.find({success: function(data){
      eventMembers = convertEventMembers(data);
      attendance = {};
      for(var i=0;i<events.length;i++){
        event = events[i];
        records = [];
        for(var j=0;j<emails.length;j++){
          email = emails[j];
          ems = _.where(eventMembers, {event_id: event.google_id, member_email: email});
          chair = _.filter(ems, function(x){
            return x.type == 'chair' || x.type == 'exec';
          });
          type = 'none';
          if(chair.length > 0){
            type = 'chair';
          }
          else{
            cm = _.filter(ems, function(x){
              return (x.type == 'cm');
            });
            if(cm.length > 0){
              type = 'cm';
            }
          }
          records.push({'email': email, 'type': type}); 
        }
        attendance[event.google_id] = records;
      };
      $scope.attendance = attendance;
      $scope.$digest();
    }});
  }


  function computeAttendance(emails, eventHash){
    q = new Parse.Query(EventMember);
    q.limit(10000);
    q.containedIn('member_email', emails);
    q.find({success: function(data){
      eventMembers = convertEventMembers(data);
      //create map from em id to em
      $scope.emMap = _.object(_.map(eventMembers, function(x){
        return  [x.id, x];
      }));
      attendance = {};
      for(var i=0;i<emails.length;i++){
        email = emails[i];
        pts = 0;
        cm = [];
        chair = [];
        ems = _.where(eventMembers, {member_email: email});
        // calculate attendance + points
        for(var j=0;j<ems.length;j++){
          em = ems[j];
          event = eventHash[em.event_id];
          if(event != null && (em.type == 'chair' || em.type == 'exec')){
            pts += event.points || 0;
          }
          if(em.type == 'chair' || em.type == 'exec'){
            chair.push(em.event_id);
          }
          if(em.type == 'cm'){
            cm.push(em.event_id);
          }
        }
        attendance[email] = {'points': pts, 
          'attendance': ems, 
          'chair': chair, 
          'cm': cm};
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
