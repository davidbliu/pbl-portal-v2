

app.controller('PointsController', function($scope, $http, PointsService, UtilService) {
  $scope.myEmail = $('#uname').text();
  console.log('email was '+$scope.myEmail);
  PointsService.points($scope.myEmail, function(data){
    $scope.myPoints = data;
    $scope.$digest();
  });
});
