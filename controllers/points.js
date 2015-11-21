

app.controller('PointsController', function($scope, $http, PointsService, UtilService) {
  $scope.myEmail = 'davidbliu@gmail.com';
  PointsService.points($scope.myEmail, function(data){
    $scope.myPoints = data;
    $scope.$digest();
  });
});
