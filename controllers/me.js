
app.controller('MeController', function($scope, $http, MemberService, UtilService) {
  myEmail = 'davidbliu@gmail.com';
  console.log(myEmail);
  MemberService.me(myEmail, function(data){
    $scope.me = data;
    $scope.$digest();
  });

});
