app.controller('HomeController', function($scope, $http, MemberService) {
  $scope.message = 'welcome to pbl frontend';
  //myEmail = 'alice.sun94@gmail.com';
  myEmail = authEmail;
  $scope.message += ' you are '+myEmail;

  $scope.catURLs = [];
  for(var i=0;i<15;i++){
    $scope.catURLs.push('http://thecatapi.com/api/images/get?format=src&type=gif');
  }

  MemberService.memberHash(function(data){
    $scope.memberHash = data;
    $scope.myPosition = data[myEmail].position;
  });
  
});
