
app.service("UtilService",  function($http) {
  var serviceInstance = {};
  serviceInstance.loadingGif ='/wd-libs/frontend/images/loading-gif.gif';
  serviceInstance.gravatarUrl = function(member){
    if( member.facebook_url != null && member.facebook_url != ''){
      return member.facebook_url;
    }
    email = member.email;
    hash = md5(email);
    url = 'http://www.gravatar.com/avatar/';
    url = url+hash;
    return url;
  };
  serviceInstance.getParameterByName =  function(name, callback){
    param = getParameterByName(name);
    console.log('param was '+param);
    callback(param);
  }
  function getParameterByName(name) {
    console.log('callingwith name '+name);
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
  } 
  return serviceInstance;
});
