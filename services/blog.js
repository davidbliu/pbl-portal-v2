
function convertPosts(posts){
  r = [];
  for(var i=0;i<posts.length;i++){
    p = {};
    p.title = posts[i].get('title');
    p.content = posts[i].get('content');
    p.view_permissions = posts[i].get('view_permissions');
    p.edit_permissions = posts[i].get('edit_permissions');
    p.createdAt = posts[i].get('createdAt');
    p.author = posts[i].get('author');
    p.timestamp = posts[i].get('timestamp');
    p.objectId = posts[i].id;
    p.tags = posts[i].get('tags');
    p.last_editor = posts[i].get('last_editor');
    r.push(p);
  }
  return r;
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
  return true;
}

app.service("BlogService",  function($http) {
    var serviceInstance = {};

    serviceInstance.tags = ['Pin', 'Announcements', 'Other', 'Reminders', 'Events', 'Email','Tech', 'CO', 'CS', 'FI', 'HT', 'MK', 'IN', 'PB', 'SO', 'WD', 'EX', 'OF'];
    serviceInstance.permissionsList = ['Only Me', 'Only Execs', 'Only Officers', 'Only PBL', 'Anyone'];

    //TODO: only get posts that this user can view
    serviceInstance.allPosts = function(me, callback){
      console.log('i am ');
      console.log(me);
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

    
    return serviceInstance;
});
