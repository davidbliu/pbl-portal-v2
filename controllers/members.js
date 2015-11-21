
app.controller('MembersController', function($scope, $http, MemberService, UtilService) {
  MemberService.committeeHash(function(data){
    $scope.committeeHash = data;
    $scope.committees = Object.keys(data);
    $scope.$digest();
  });

  $scope.currentMembers = [];
  $scope.gravatarUrl = UtilService.gravatarUrl;
  $scope.loadingGif = UtilService.loadingGif; 
});
