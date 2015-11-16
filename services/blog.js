
app.service("BlogService",  function($http) {
    var serviceInstance = {};

    serviceInstance.tags = ['Pin', 'Announcements', 'Other', 'Reminders', 'Events', 'Email','Tech', 'CO', 'CS', 'FI', 'HT', 'MK', 'IN', 'PB', 'SO', 'WD', 'EX', 'OF'];

    serviceInstance.permissionsList = ['Only Me', 'Only Execs', 'Only Officers', 'Only PBL', 'Anyone'];

    serviceInstance.allPosts = function(callback){
      query = new Parse.Query(Blog);
      query.find({
        success: function(data){
          callback(data);
        }
      });
    };

    serviceInstance.convertPosts =function(posts){
      r = [];
      for(var i=0;i<posts.length;i++){
        p = {};
        p.title = posts[i].get('title');
        p.content = posts[i].get('content');
        p.view_permissions = posts[i].get('view_permissions');
        p.edit_permissions = posts[i].get('edit_permissions');
        p.createdAt = posts[i].get('createdAt');
        r.push(p);
      }
      return r;
    }

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
