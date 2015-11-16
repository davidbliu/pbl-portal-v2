

app.controller('PointsController', function($scope, $http, PointsService, UtilService) {
  $scope.message = 'hi there from pts controller';
  $scope.loadingGif = UtilService.loadingGif;
  email = getCookie('authEmail');
  $scope.email = email;
  PointsService.getMemberPoints(email, function(data){
    $scope.myPoints = data;
  });
});
