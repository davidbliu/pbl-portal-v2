

app.controller('AddGolinkController', function($scope, $http, GoService, UtilService) {
  $scope.loadingGif = UtilService.loadingGif;
  $scope.loading=false;
  $scope.golink = {};
  
  $scope.saveGolink = function(){
    $http.post(tokenizedURL(ROOT_URL+'/save_golink'), $scope.golink)
      .success(function(data){
        $scope.message = 'Successfully saved golink';
        //$scope.undoId = data.objectId;
      });
  };
});
