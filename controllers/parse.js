

app.controller('ParseController', function($scope, $http, MemberService, UtilService) {
  $scope.createGolink = function (){
    var gl = new Golink();
    gl.set('key', 'asdf');
    gl.set('url', 'http://www.google.com');
    gl.save(null, function(golink){
      console.log('saved golink with id '+golink.id);
    });
  }
  MemberService.memberHash(function(data){
   $scope.memberHash = data;
   $scope.$digest();
  }); 
});
