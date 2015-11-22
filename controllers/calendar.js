
app.controller('CalendarController', function($scope, $http, MemberService, PointsService, UtilService) {
  
  PointsService.events(function(data){
    $scope.events = data;
    eventSources = _.map(data, function(event){
      event.start  = Date.parse(event.start_time);
      event.title = event.name;
      return event;
    });
    $scope.eventSources = [eventSources];
    $('#calendar').fullCalendar('refetchEvents');
    $scope.$digest();
  });

  // pull in member hash
  MemberService.memberHash(function(data){
    $scope.memberHash = data;
  });

  //pull in committee hash
  MemberService.committeeHash(function(data){
    $scope.committeeHash = data;
    $scope.committees = Object.keys(data);
    //exclude gms
    $scope.committees = _.filter($scope.committees, function(x){
     return x != 'GM';
    }); 
    $scope.$digest();
  });

  //recolor
  function recolor(eventMembers){
    ems = _.object(_.map(eventMembers, function(x){
      return [x.member_email, x];
    }));
    $('.member-div').each(function(){
      $(this).removeClass('chair');
      $(this).removeClass('cm');
      email = $(this).attr('data-email');
      em = ems[email];
      if(em != null){
        $(this).addClass(em.type);
      }
    });
    window.scrollTo(0,0);
  };


  $scope.recordAttendance = function($event, email){
    type = 'chair';
    q = new Parse.Query(EventMember);
    q.equalTo('member_email', email);
    q.equalTo('event_id', $scope.event.event_id);
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
      em.set('event_id', $scope.event.event_id);
      em.set('type', type);
      em.save(null, {
        success:function(data){
          console.log('saved');
          $($event.target).removeClass('chair');
          $($event.target).removeClass('cm');
          $($event.target).addClass(type);
        }
      });
    }});
  }; 

  //calendar config
  $scope.uiConfig = {
      calendar:{
        height: 450,
        editable: false,
        header:{
          center: 'title',
          right: 'today prev,next'
        },
        eventClick: function(event){
          $scope.eventAttendance(event.google_id);
          $scope.event = event;
        }
      }
    };
  $scope.eventAttendance= function(event_id){
    PointsService.eventAttendance(event_id, function(data){
      console.log('recoloring events '+data.length);
      $scope.eventMembers = data;
      recolor(data);
    });
  }
});
