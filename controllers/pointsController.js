

app.controller('PointsController', function($scope, $http, PointsService, UtilService) {
  $scope.message = 'hi there from pts controller';
  $scope.loadingGif = UtilService.loadingGif;
  PointsService.getMemberPoints(authEmail, function(data){
    $scope.myPoints = data;
  });
});
