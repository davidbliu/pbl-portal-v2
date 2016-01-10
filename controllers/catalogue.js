app.controller('CatalogueCtrl', function($scope, $http, GoService, UtilService) {
  $scope.message = 'hi';
  q = new Parse.Query(ParseGoLink);
  q.exists('directory');
  q.find({
    success:function(golinks){
      $scope.golinks = convertGolinks(golinks);
      $scope.$digest();
    }
  });


});

