
app.controller('EmailPostController', function($scope, $http, BlogService, UtilService) {
  $scope.message = 'Redirecting you to the email landing page.';
  
  UtilService.getParameterByName("id", function(data){
    window.location.href = 'http://testing.berkeley-pbl.com/blog/email_landing_page?id='+data;
  });
});

