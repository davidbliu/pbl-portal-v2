
app.controller('AuthController', function($scope, $http, MemberService) {
  //$scope.me = getCookie('me');
  MemberService.memberHash(function(data){
    $scope.me = data[authEmail];
    setCookie('me', $scope.me);
  });
});
