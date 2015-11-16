

app.service("PointsService",  function($http) {
    var serviceInstance = {};
    serviceInstance.getMemberPoints = function(email, callback){
        $http.get(tokenizedURL(ROOT_URL+'/get_member_points?email='+encodeURIComponent(email)))
            .success(function(data){
                callback(data);
            });
    };
    serviceInstance.getEvents = function(callback){
      $http.get(tokenizedURL(ROOT_URL+'/events'))
        .success(function(data){
          callback(data);
        });
    };
    serviceInstance.getEventHash = function(callback){
      $http.get(tokenizedURL(ROOT_URL+'/events'))
        .success(function(data){
          h = {};
          for(var i=0;i<data.length;i++){
            h[data[i].google_id] = data[i];
          }
          callback(h);
        });
    };
    return serviceInstance;
});
