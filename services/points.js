

app.service("PointsService",  function($http) {
    var serviceInstance = {};

    serviceInstance.points = function(myEmail, callback){
      Parse.Cloud.run("points", {email: myEmail}, 
                      {success:function(data){
                       console.log(data);
                      }}); 
    };
    serviceInstance.events = function(callback){
      query = new Parse.Query(Event);
      query.limit(10000);
      query.descending('start_time');
      query.find({
        success:function(data){
          events = convertEvents(data);
          callback(events);
        }
      });
    };
    serviceInstance.getEventHash = function(events){
     h = {};
     for(var i=0;i<events.length;i++){
       h[events[i].event_id] = events[i];
     }
     return h;
    };  

    serviceInstance.eventAttendance = function(event_id, callback){
      q = new Parse.Query(Attendance);
      q.containedIn('event_ids', [event_id]);
      q.find({success:function(data){
        callback(convertAttendances(data));
      }});
    };

    serviceInstance.runHello = function(){
      Parse.Cloud.run('hello', null, {success:function(data){
        console.log('success');
          console.log(data);
      }});
    };

    serviceInstance.points = function(email, callback){
      Parse.Cloud.run("points", {email:email}, 
                      {
                        success:function(data){
                          callback(data);
                        }
                      });
    };
    //serviceInstance.parseMemberPoints = function(email, callback){
      //emQuery = new Parse.Query(EventMember); 
      //emQuery.equalTo('member_email', email);
      //emQuery.find({
        //success:function(data){
          //eids = [];
          //for(var i=0;i<data.length;i++){
            //eids.push(data[i].get('event_id'));
          //}
          //eQuery = new Parse.Query(Event);
          //eQuery.containedIn('google_id', eids);
          //eQuery.find({
            //success:function(results){
              //points = 0;
              //attendance = [];
              //for (var i=0;i<results.length;i++){
                //pts = results[i].get('points') || 0;
                //points = points + pts;
                //event = {};
                //event.name = results[i].get('name');
                //event.points = results[i].get('points');
                //attendance.push(event);
              //}
              //r = {};
              //r.attendance = attendance;
              //r.points = points;
              //callback(r);
            //}
          //});
        //}
      //});
    //};
    return serviceInstance;
});
function convertAttendance(pa){
  a = {};
  a.member_email = pa.get('member_email');
  a.event_ids = pa.get('event_ids');
  return a;
}
function convertAttendances(pas){
  as =  _.map(pas, function(x){
    return convertAttendance(x);
  });
  return as;
}
function convertEventMember(parseEventMember){
  return {'member_email': parseEventMember.get('member_email'),
    'event_id': parseEventMember.get('event_id'),
    'type': parseEventMember.get('type')}
}
function convertEventMembers(ems){
  return _.map(ems, function(x){
    return convertEventMember(x);
  });
}

function convertEvent(parseEvent){
  e = {};
  e.event_id = parseEvent.get('google_id');
  e.name = parseEvent.get('name');
  e.points = parseEvent.get('points');
  e.start_time = parseEvent.get('start_time');
  e.google_id = parseEvent.get('google_id');
  e.objectId = parseEvent.id;
  return e;
}
function convertEvents(parseEvents){
  events = [];
  for(var i=0;i<parseEvents.length;i++){
    c = convertEvent(parseEvents[i]);
    events.push(c);
  }
  return events;
}  

