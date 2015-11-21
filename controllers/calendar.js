
app.controller('CalendarController', function($scope, $http, PointsService, UtilService) {
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
        }
      }
    };
  $scope.eventAttendance= function(event_id){
    PointsService.eventAttendance(event_id, function(data){
      $scope.eventMembers = data;
    });
  }
});
