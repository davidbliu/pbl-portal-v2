
app.service("BlogService",  function($http) {
    var serviceInstance = {};

    serviceInstance.tags = ['Pin', 'Announcements', 'Other', 'Reminders', 'Events', 'Email','Tech', 'CO', 'CS', 'FI', 'HT', 'MK', 'IN', 'PB', 'SO', 'WD', 'EX', 'OF'];

    serviceInstance.permissionsList = ['Only Me', 'Only Execs', 'Only Officers', 'Only PBL', 'Anyone'];

    serviceInstance.allPosts = function(callback){
        $http.get(tokenizedURL(ROOT_URL+'/all_blogposts'))
            .success(function(data){
                callback(data);
            });
    };

    serviceInstance.savePost = function(post, callback){
     $http.post(tokenizedURL(ROOT_URL+'/save_blogpost'), post)
       .success(function(data){
         callback(data);
       });
    };

    serviceInstance.saveBlogpost = function(title, content, tags, permissions, callback){
      $http.post(tokenizedURL(ROOT_URL+'/create_blogpost'), params)
        .success(function(data){
          console.log(data);
          callback(data);
        });
    };

    serviceInstance.getPost = function(id, callback){
      $http.get(tokenizedURL(ROOT_URL+'/get_blogpost?id='+id))
        .success(function(data){
          callback(data);
        });
    }
    

    serviceInstance.deletePost= function(id, callback){
      $http.get(tokenizedURL(ROOT_URL+'/delete_blogpost?id='+id))
        .success(function(data){
          callback(data);
        });
    }
    return serviceInstance;
});
