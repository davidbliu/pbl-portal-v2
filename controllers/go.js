
app.controller('GoController', function($scope, $http, GoService, UtilService) {
  $scope.loadingGif = UtilService.loadingGif;
  $scope.loading=false;
  $scope.message = 'hi there from go controller';
  $scope.searchGolinks = function(searchTerm){
    $scope.loading = true;
    GoService.searchGolinks(searchTerm, function(data){
      $scope.golinks = data;
      $scope.loading=false;
    });
  }
  GoService.recentGolinks(function(data){
    $scope.golinks = data;
  });
  $scope.filterOptions = ['Recent Links', 'My Links', 'Popular Links'];
  $scope.filterOptions = $scope.filterOptions.reverse();

  $scope.$watch('filter', function(newFilter){
    if(newFilter == 'My Links'){
      $scope.loading = true;
      GoService.myLinks(function(data){
        $scope.loading = false;
        $scope.golinks = data;
      });
    }
    if(newFilter == 'Popular Links'){
      $scope.loading = true;
      GoService.popularGolinks(function(data){
        $scope.loading = false;
        $scope.golinks = data;
      });
    }
    if ( newFilter == 'Recent Links'){
      $scope.loading = true;
      GoService.recentGolinks(function(data){
        $scope.loading = false;
        $scope.golinks = data;
      });
    }
     
  });

  $scope.changeFilter = function(filter){
    console.log('filter: '+filter);
  };
});
