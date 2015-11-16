
app.controller('AuthController', function($scope, $http, MemberService) {
  console.log('hi');
  MemberService.parseMemberHash(function(data){
    $scope.me = data[authEmail];
    $scope.$digest();
  });
});
