function events(callback){
      query = new Parse.Query(Event);
      query.limit(10000);
      query.descending('start_time');
      query.find({
        success:function(data){
          events = convertEvents(data);
          callback(events);
        }
      });
}
function eventHash(events){
  return _.object(_.map(events, function(x){
    return [x.google_id, x];
  }));
}
function attendance(callback){ 
  q = new Parse.Query(Attendance);
  q.limit(1000);
  q.find({
    success:function(data){
      callback(convertAttendances(data));
    }
  });
}

app.service("PointsService",  function($http) {
    var serviceInstance = {};

    serviceInstance.points = function(myEmail, callback){
      events(function(data){
        eHash = eventHash(data);
        aquery = new Parse.Query(Attendance);
        aquery.equalTo('member_email', myEmail);
        aquery.find({
          success: function(data){
            r = {};
            a = convertAttendance(data[0]);
            events = _.map(a.event_ids, function(x){
              return eHash[x];
            });
            points = _.map(events, function(x){
              return x.points || 0;
            });
            points = _.reduce(points, function(memo, num){
              return memo+num;
            }, 0);
            callback({'points': points, 'attendance': events});
          }
        });
      });
    };
    serviceInstance.memberAttendance = function(email, callback){
      q = new Parse.Query(Attendance);
      q.equalTo('member_email', email);
      q.find({
        success:function(data){
          callback(convertAttendances(data));
        }
      });
    };
    serviceInstance.events = function(callback){
      events(callback);
    };
    serviceInstance.getEventHash= function(events){
      return eventHash(events);
    };
    
    serviceInstance.attendance = function(callback){
      attendance(callback);
    };

    serviceInstance.eventAttendance = function(event_id, callback){
      q = new Parse.Query(Attendance);
      q.containedIn('event_ids', [event_id]);
      q.find({success:function(data){
        callback(convertAttendances(data));
      }});
    };


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

