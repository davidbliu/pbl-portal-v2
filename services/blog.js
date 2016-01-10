
var postFields = ['title', 'content', 'view_permissions', 'edit_permissions', 'createdAt', 'author', 'timestamp', 'tags', 'last_editor', 'parent', 'folder', 'img'];
function convertPost(p){
  return convertParse(p, postFields);
}
function convertPosts(posts){
  return convertParseObjects(posts, postFields);
}
function convertComments(comments){
  return convertParseObjects(comments, postFields);
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
    serviceInstance.folders = ['Pin', 'Announcements', 'Other', 'Reminders', 'Events', 'Email','Tech'];
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

    serviceInstance.folderPosts = function(me,folder, callback){
      query = new Parse.Query(Blog);
      query.descending('createdAt');
      query.equalTo('folder', folder);
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
    
    serviceInstance.getComments = function(id, callback){
      q = new Parse.Query(BlogPost);
      q.equalTo('parent', id);
      q.find({
        success:function(pComments){
          callback(convertComments(pComments));
        }
      });
    };
    return serviceInstance;
});
