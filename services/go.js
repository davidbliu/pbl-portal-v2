
app.service("GoService",  function($http) {
    var serviceInstance = {};

    serviceInstance.recentGolinks = function(callback){
      query = new Parse.Query(Golink);
      query.descending('createdAt');
      query.find({
        success: function(data){
          callback(data);
        }
      });
        //$http.get(tokenizedURL(ROOT_URL+'/recent_golinks'))
            //.success(function(data){
                //callback(data);
            //});
    };

    serviceInstance.convertResults = function(results){
      rs = [];
      for(var i=0;i<results.length;i++){
        r = {};
        r.key = results[i].get('key');
        r.url = results[i].get('url');
        r.description = results[i].get('description');
        r.member_email = results[i].get('member_email');
        rs.push(r);
      }
      return rs;
    }

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
