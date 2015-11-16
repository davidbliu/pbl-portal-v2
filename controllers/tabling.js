
app.controller('TablingController', function($scope, $http, TablingService, MemberService, UtilService) {
  $scope.loadingGif = UtilService.loadingGif;
  $scope.gravatarUrl = UtilService.gravatarUrl;

  TablingService.tablingSlots(function(data){
    $scope.tablingSlots = data;
    $scope.tablingHash = TablingService.tablingHash(data);
    $scope.tablingDays = Object.keys($scope.tablingHash);
    console.log('tabling hash is '+$scope.tablingHash);
    console.log($scope.tablingHash);
  });

  MemberService.memberHash(function(data){
    $scope.memberHash = data;
  });

  $scope.timeString = function(time){
    return TablingService.timeString(time);
  };

});
