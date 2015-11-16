
//var authEmail = 'alice.sun94@gmail.com';
$(document).ready(function(){
  setCurrentUser(getCookie('authEmail'));
  $('#linout').click(function(){
    toggleLogin();
  });
});

function setCurrentUser(email){
  if(email == '' || email == null){
    return;
  }
  authEmail = email;
  $('#linout').text(email);
}

function onLoad() {
  gapi.load('auth2', function() {
    gapi.auth2.init({client_id: GOOGLE_CLIENT_ID});
  });
}

onLoad();

function signIn(){
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signIn().then(function(googleUser){
    onSignIn(googleUser);
  });
}

function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail());
  
  // save email in global variable
  authEmail = profile.getEmail();
  setCurrentUser(profile.getEmail());
  setCookie('authEmail', authEmail);
}

function setCookie(cname, cvalue) {
    exdays = 10; // expire in 10 days?
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}


function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
    authEmail = null;
    setCookie('authEmail', '');
    $('#linout').text('Login');
  });
}

function toggleLogin(){
  console.log('authEmail was '+authEmail);
  if(authEmail == null){
    signIn();
  }
  else{
    signOut();
  }
}


function tokenizeEmail(email){
  var result = '';
  for (var i=0;i<email.length;i++){
    result += email.charCodeAt(i).toString(16);
  }
  return result;
}
function tokenizedURL(url){
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
