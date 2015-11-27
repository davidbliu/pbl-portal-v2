
app.controller('TablingController', function($scope, $http, TablingService, MemberService, UtilService) {
  $scope.gravatarUrl = UtilService.gravatarUrl;

  TablingService.tablingSlots(function(data){
    $scope.tablingSlots = data;
    $scope.tablingHash = TablingService.tablingHash(data);
    $scope.tablingDays = Object.keys($scope.tablingHash);
  });

  MemberService.memberHash(function(data){
    $scope.memberHash = data;
    $scope.$digest();
  });

  $scope.timeString = function(time){
    return TablingService.timeString(time);
  };

});
