
app.controller('MembersController', function($scope, $http, MemberService, UtilService) {
  MemberService.parseCurrentMembers(function(data){
    data = MemberService.convertResults(data);
    console.log('this is data');
    console.log(data);
    $scope.currentMembers = data;
    $scope.committeeHash = MemberService.getCommitteeHash(data);
    $scope.committees = Object.keys($scope.committeeHash);
    console.log($scope.committees);
    $scope.$digest();
  });
  $scope.currentMembers = [];
  $scope.gravatarUrl = UtilService.gravatarUrl;
  $scope.loadingGif = UtilService.loadingGif; 
});
