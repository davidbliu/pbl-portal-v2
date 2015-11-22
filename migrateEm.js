
app.controller('MigrateController', function($scope, $http, MemberService,PointsService, UtilService) {
  $scope.message = 'hi';
  MemberService.currentMembers(function(data){
    $scope.currentMembers = data;
    $scope.$digest();
    PointsService.events(function(events){
      eventsHash = PointsService.getEventHash(events);
      _.each($scope.currentMembers, function(member){
        email = member.email;
        convertEMs(email, eventsHash);
      });
    });
  });
});

A = Parse.Object.extend("Attendance");
function convertEMs(email, eventsHash){
  q = new Parse.Query(EventMember);
  q.equalTo("member_email", email);
  q.limit(1000);
  q.find({
    success:function(data){
      data = convertEventMembers(data);
      eids = _.map(data, function(x){
        return x.event_id;
      });
      a = new A();
      a.set('member_email', email);
      a.set('event_ids', eids);
      a.save();
    }
  });
}
