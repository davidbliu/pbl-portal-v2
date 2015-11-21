
app.controller('RankingsController', function($scope, $http, MemberService, PointsService, UtilService) {
  MemberService.committeeHash(function(data){
    $scope.committeeHash = data;
  });
  PointsService.events(function(data){
    $scope.events=data;
  });

});
