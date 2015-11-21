
// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
Parse.Cloud.define("hello", function(request, response) {
  response.success("Hello world!");
});

Parse.Cloud.define("points", function(request, response){
  emQuery = new Parse.Query('ParseEventMember'); 
  emQuery.equalTo('member_email', request.params.email);
  emQuery.limit(1000);
  emQuery.find({
    success:function(data){
      eids = [];
      for(var i=0;i<data.length;i++){
        eids.push(data[i].get('event_id'));
      }
      eQuery = new Parse.Query('ParseEvent');
      eQuery.containedIn('google_id', eids);
      eQuery.find({
        success:function(results){
          points = 0;
          attendance = [];
          for (var i=0;i<results.length;i++){
            pts = results[i].get('points') || 0;
            points = points + pts;
            event = {};
            event.name = results[i].get('name');
            event.event_id = results[i].get('google_id'); 
            event.points = results[i].get('points');
            attendance.push(event);
          }
          //return result
          r = {};
          r.attendance = attendance;
          r.points = points;
          response.success(r);
        }
      });
    }
  });
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

function memberHash(callback){
  q = new Parse.Query("ParseMember");
  q.limit(1000);
  q.find({
    success:function(data){
      h = {};
      for(var i=0;i<data.length;i++){
        member = convertMember(data[i]);
        h[member.email] = member;
      }
      callback(h);
    }
  });
}

function getCommitteeHash(data){
    h = {};
    seen = [];
    for(var i=0;i<data.length;i++){
        if(seen.indexOf(data[i].committee) == -1){
            seen.push(data[i].committee);
            h[data[i].committee] = [];
        }
        h[data[i].committee].push(data[i]);
    }
    return h;
}; 

function committeeHash(callback){
  q = new Parse.Query("ParseMember");
  q.limit(1000);
  q.equalTo('latest_semester', 'Fall 2015');
  q.find({
    success:function(data){
      members = convertMembers(data);
      chash = getCommitteeHash(members);
      callback(chash);
    }
  });
};

Parse.Cloud.define("memberHash", function(request, response){
  memberHash(response.success);
});

Parse.Cloud.define("committeeHash", function(request, response){
  committeeHash(response.success);
});
