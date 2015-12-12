function convertPost(pp){
  p = {};
  p.title = pp.get('title');
  p.content = pp.get('content');
  p.view_permissions = pp.get('view_permissions');
  p.edit_permissions = pp.get('edit_permissions');
  p.createdAt = pp.get('createdAt');
  p.author = pp.get('author');
  p.timestamp = pp.get('timestamp');
  p.objectId = pp.id;
  p.tags = pp.get('tags');
  p.last_editor = pp.get('last_editor');
  return p;
}
function convertPosts(posts){
  r = [];
  for(var i=0;i<posts.length;i++){
    r.push(convertPost(posts[i]));
  }
  return r;
}

function saveNewPost(postData, callback){
  post = new Blog();
  //set all keys
  _.each(Object.keys(postData), function(key){
   post.set(key, postData[key]);
  }); 
  //save post
  post.save(null, {
    success:function(data){
      callback(data);
    }
  });
}
function saveExistingPost(postData, callback){
  q = new Parse.Query(Blog);
  q.get(postData.objectId, {
    success:function(post){
      _.each(Object.keys(postData), function(key){
         post.set(key, postData[key]);
      }); 
      //save post
      post.save(null, {
        success:function(data){
          callback(data);
        }
      });
    }
  });
}
function canViewPost(me, post){
  if (post.view_permissions == 'Anyone' || post.view_permissions == 'Only PBL' || post.author == me.email || post.last_editor == me.email){
      return true;
  }
  if (post.view_permissions == 'Only Officers'){
    if(me.position == 'chair' || me.position == 'exec'){
      return true;
    }
    else{
      return false;
    }
  }
  if(post.view_permissions == 'Only Me'){
    return false;
  }
  return true;
}

function canEditPost(me, post){
  if (post.edit_permissions == 'Anyone' || post.edit_permissions == 'Only PBL' || post.author == me.email || post.last_editor == me.email){
      return true;
  }
  if (post.edit_permissions == 'Only Officers'){
    if(me.position == 'chair' || me.position == 'exec'){
      return true;
    }
    else{
      return false;
    }
  }
  if(post.edit_permissions == 'Only Me'){
    return false;
  }
  return true;
}

app.service("BlogService",  function($http) {
    var serviceInstance = {};

    serviceInstance.canEditPost = function(me, post){
      return canEditPost(me, post);
    };

    serviceInstance.tags = ['Pin', 'Announcements', 'Other', 'Reminders', 'Events', 'Email','Tech', 'CO', 'CS', 'FI', 'HT', 'MK', 'IN', 'PB', 'SO', 'WD', 'EX', 'OF'];
    serviceInstance.permissionsList = ['Only Me', 'Only Execs', 'Only Officers', 'Only PBL', 'Anyone'];

    //TODO: only get posts that this user can view
    serviceInstance.allPosts = function(me, callback){
      query = new Parse.Query(Blog);
      query.descending('createdAt');
      query.find({
        success: function(data){
          posts = convertPosts(data);
          posts = _.filter(posts, function(post){
            return canViewPost(me, post);
          });
          callback(posts);
        }
      });
    };

    serviceInstance.getPost = function(postId, callback){
      q = new Parse.Query(Blog);
      q.get(postId, {
        success:function(data){
          callback(convertPost(data));
        }
      });
    };

    serviceInstance.savePost = function(postData, callback){
      if(post.objectId == null){
        saveNewPost(postData, callback);
      }
      else{
        saveExistingPost(postData, callback);
      }
    };

    serviceInstance.deletePost = function(id, callback){
      q = new Parse.Query(Blog);
      q.get(id, {
        success:function(post){
          post.destroy({
            success:function(data){
              callback(data);
            }
          });
        }
      });
    };

    return serviceInstance;
});
