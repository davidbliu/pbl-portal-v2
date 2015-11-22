
app.controller('RankingsController', function($scope, $http, MemberService, PointsService, UtilService) {
  MemberService.committeeHash(function(data){
    $scope.committeeHash = data;
  });
  PointsService.events(function(data){
    $scope.events=data;
  });
  //get all event members
  MAXINT = 100000;
  
  function eventMembers(event_ids, callback){
    q = new Parse.Query("ParseEventMember");
    q.limit(MAXINT);
    q.containedIn('event_id', event_ids);
    q.equalTo("type", "chair");
    q.find({
      success:function(data){
        callback(convertEventMembers(data));
      }
    });
  }
  function getEvents(callback){
    q = new Parse.Query("ParseEvent");
    q.limit(MAXINT);
    q.equalTo('semester_name', 'Fall 2015');
    q.find({
      success:function(data){
        callback(convertEvents(data));
      }
    });
  };           
  function getMembers(callback){
    MemberService.memberHash(callback);
  }
  function allPoints(){
    //get events, get members, get event members
    getEvents(function(eventsData){
      console.log('eventsData '+eventsData.length);
      getMembers(function(membersData){
        console.log('membersData '+membersData.length);
        eids = _.map(eventsData, function(x){
          return x.google_id;
        });
        eventMembers(eids, function(emData){
          console.log('event members ' + emData.length);
        });
      });
    });
  }
  allPoints();
});
