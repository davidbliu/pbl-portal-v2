
app.controller('MembersController', function($scope, $http, MemberService, UtilService) {
  MemberService.currentMembers(function(data){
    
    $scope.currentMembers = data;
    console.log(data);
    $scope.committeeHash = MemberService.getCommitteeHash(data);
    $scope.committees = Object.keys($scope.committeeHash);
    $scope.$digest();
  });
  $scope.currentMembers = [];
  $scope.gravatarUrl = UtilService.gravatarUrl;
  $scope.loadingGif = UtilService.loadingGif; 
});
