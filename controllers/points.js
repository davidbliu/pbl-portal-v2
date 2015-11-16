

app.controller('PointsController', function($scope, $http, PointsService, UtilService) {
  PointsService.parseMemberPoints('davidbliu@gmail.com', function(data){
    console.log('callback');
    console.log(data);
    $scope.myPoints = data;
    $scope.$digest();
  });
  $scope.message = 'hi there from pts controller';
  $scope.loadingGif = UtilService.loadingGif;
  email = getCookie('authEmail');
  $scope.email = email;
  //PointsService.getMemberPoints(email, function(data){
    //$scope.myPoints = data;
  //});
});
