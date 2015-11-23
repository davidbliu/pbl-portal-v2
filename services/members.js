app.service("MemberService",  function($http, $rootScope) {
    var serviceInstance = {};
    
    serviceInstance.currentMembers = function(callback){
      query = new Parse.Query(Member);
      query.limit(MAXINT);
      query.equalTo('latest_semester', CURRENT_SEMESTER);
      query.find({
        success: function(results){
          callback(convertMembers(results));
        }
      });
    }

    serviceInstance.me = function(email, callback){
      query = new Parse.Query(Member);
      query.equalTo('email', email);
      query.find({
        success:function(data){
          m = convertMembers(data);
          callback(m[0]);
        }});
    };
  
    serviceInstance.committeeMembers = function(committee, callback){
      query = new Parse.Query(Member);
      query.equalTo('committee' , committee);
      query.find({
        success:function(data){
          callback(convertMembers(data));
        }
      });
    };

    serviceInstance.memberHash = function(callback){
      Parse.Cloud.run('memberHash', {email:'alice.sun94@gmail.com'}, {
        success:function(data){
          callback(data);
        }
      });
    }

    serviceInstance.committeeHash = function(callback){
      Parse.Cloud.run('committeeHash', {}, {
        success:function(data){
          callback(data);
        }
      });
    }

   serviceInstance.getMemberHash = function(members){
     h = {};
     for (var i=0;i<members.length;i++){
       h[members[i].email] = members[i];
     }
     return h
   };

   serviceInstance.getCommitteeHash = function(data){
        h = {};
        seen = new Set();
        for(var i=0;i<data.length;i++){
            if(!seen.has(data[i].committee)){
                seen.add(data[i].committee);
                h[data[i].committee] = [];
            }
            h[data[i].committee].push(data[i]);
        }
        return h;
    }; 

    return serviceInstance;
});

function convertMember(parseMember){
  m = {};
  m['name'] = parseMember.get('name');
  m['position'] = parseMember.get('position');
  m['email'] = parseMember.get('email');
  m['major'] = parseMember.get('major');
  m['phone'] = parseMember.get('phone');
  m['year'] = parseMember.get('year');
  m['committee'] = parseMember.get('committee');
  return m;
}

function convertMembers(parseMembers){
  members = [];
  for (var i=0;i<parseMembers.length;i++){
    members.push(convertMember(parseMembers[i]));
  }
  return members;
}
 function getMemberHash(members){
   h = {};
   for (var i=0;i<members.length;i++){
     h[members[i].email] = members[i];
   }
   return h
 };
