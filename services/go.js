
app.service("GoService",  function($http) {
    var serviceInstance = {};

    serviceInstance.recentGolinks = function(callback){
        $http.get(tokenizedURL(ROOT_URL+'/recent_golinks'))
            .success(function(data){
                callback(data);
            });
    };

    serviceInstance.myLinks = function(callback){
        $http.get(tokenizedURL(ROOT_URL+'/my_links'))
            .success(function(data){
                callback(data);
            });
    };

    serviceInstance.popularGolinks = function(callback){
        $http.get(tokenizedURL(ROOT_URL+'/popular_golinks'))
            .success(function(data){
                callback(data);
            });
    };

    serviceInstance.searchGolinks = function(searchTerm, callback){
        $http.get(tokenizedURL(ROOT_URL+'/search_golinks?searchTerm='+encodeURIComponent(searchTerm)))
            .success(function(data){
                callback(data);
            });
    };

    serviceInstance.saveGolink = function(golink, callback){
      $http.post(tokenizedURL(ROOT_URL+'/save_golink'), golink)
            .success(function(data){
                callback(data);
            });
    };
    return serviceInstance;
});
