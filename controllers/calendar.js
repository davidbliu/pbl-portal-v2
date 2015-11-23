
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
    emails = _.map(eventMembers, function(x){
      return x.member_email;
    });
    $('.member-div').each(function(){
      $(this).removeClass('chair');
      $(this).removeClass('cm');
      email = $(this).attr('data-email');
      if(emails.indexOf(email)!=-1){
        $(this).addClass('chair');
      }
    });
    window.scrollTo(0,0);
  };


  $scope.recordAttendance = function($event, email){
    q = new Parse.Query(Attendance);
    q.equalTo('member_email', email);
    q.find({
      success:function(data){
        a = data[0];
        console.log(a.get('event_ids'));
        $($event.target).removeClass('chair');
        eids = a.get('event_ids');
        index = eids.indexOf($scope.event.event_id);
        if(index ==-1){
          eids.push($scope.event.event_id); 
          $($event.target).addClass('chair');
        }
        else{
          eids.splice(index, 1);
        }
        a.set('event_ids', eids);
        a.save();
        
      }
    });
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
