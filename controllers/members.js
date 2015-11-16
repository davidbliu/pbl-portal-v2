
app.controller('MembersController', function($scope, $http, MemberService, UtilService) {
  function init(){
    MemberService.currentMembers(function(data){
      $scope.currentMembers = data;
      $scope.committeeHash = MemberService.getCommitteeHash(data);
      $scope.committees = Object.keys($scope.committeeHash);
    });
  }
  $scope.currentMembers = [];
  $scope.gravatarUrl = UtilService.gravatarUrl;
  init();
  $scope.loadingGif = UtilService.loadingGif; 
});
