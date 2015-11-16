var ROOT_URL = 'http://wd.berkeley-pbl.com:3000'
var app = angular.module('pblApp',[]);
app.filter('to_trusted', ['$sce', function($sce){
    return function(text) {
        return $sce.trustAsHtml(text);
    };
}]);

var authEmail = 'davidbliu@gmail.com';
function tokenizeEmail(email){
  var result = '';
  for (var i=0;i<email.length;i++){
    result += email.charCodeAt(i).toString(16);
  }
  return result;
}
function tokenizedURL(url){
  authEmail = getCookie('authEmail');
  if(authEmail == null){
    email = '';
  }
  else{
    email = authEmail;
  }
  token = tokenizeEmail(email);
  if(url.indexOf('?') != -1){
      tokenized = url + '&token='+token;
  }
  else{
      tokenized =  url + '?token='+token;
  }
  console.log(tokenized);
  return tokenized;
}
