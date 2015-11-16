
app.controller('TablingController', function($scope, $http, TablingService, MemberService, UtilService) {
  $scope.loadingGif = UtilService.loadingGif;
  $scope.gravatarUrl = UtilService.gravatarUrl;

  TablingService.parseTablingSlots(function(data){
    $scope.tablingSlots = data;
    $scope.tablingHash = TablingService.tablingHash(data);
    $scope.tablingDays = Object.keys($scope.tablingHash);
  });

  MemberService.parseMemberHash(function(data){
    $scope.memberHash = data;
    $scope.$digest();
  });

  $scope.timeString = function(time){
    return TablingService.timeString(time);
  };

});
