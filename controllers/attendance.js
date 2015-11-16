
app.controller('AttendanceController', function($scope, $http, MemberService, PointsService, UtilService) {
  $scope.loadingGif = UtilService.loadingGif;
  $scope.loading=false;
  $scope.message = 'hi there from attendance controller';

  MemberService.memberHash(function(hash){
    $scope.me = hash[authEmail];
    if($scope.me == 'cm'){
      // filter out stuff
    }

  });  
  
  // if chair, load entire committees attendance
  $http.get(tokenizedURL(ROOT_URL+'/attendance'))
    .success(function(data){
      console.log(data);
      $scope.attendance = data;
      $scope.coCMs = Object.keys(data);
    }); 
   PointsService.getEvents(function(data){
    $scope.events = data;
   }); 

  $scope.attendedEvent = function(email, id){
    attended = $scope.attendance[email];
    for(var i=0;i<attended.length;i++){
      if(attended[i].event_id == id){
        return attended[i].type;
      }
    }
    return 'none';
  };

  $scope.recordAttendance = function($event, event, email){
    console.log('recording attendance');
    data = {'email': email, 'event_id': event.google_id};
    clickedElem = $event.target;
    console.log('clicked elem was ');
    console.log(clickedElem);
    $http.post(tokenizedURL(ROOT_URL+'/record_attendance'), data)
      .success(function(data){
        console.log('successfully saved event member');
        console.log(data);
        $(clickedElem).removeClass('chair');
        $(clickedElem).removeClass('none');
        $(clickedElem).removeClass('cm');
        $(clickedElem).addClass(data);
      });
  };
});
