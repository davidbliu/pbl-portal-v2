function convertTablingSlot(pts){
  ts = {};
  ts.member_emails = pts.get('member_emails');
  ts.time = pts.get('time');
  ts.objectId = pts.id;
  return ts;
}
function convertTablingSlots(pts){
  return _.map(pts, function(x){
    return convertTablingSlot(x);
  });
}

app.service("TablingService",  function($http, $rootScope) {
    var serviceInstance = {};
    serviceInstance.tablingSlots = function(callback){
      query = new Parse.Query(TablingSlot);
      query.find({
        success: function(results){
          callback(convertTablingSlots(results));
        }});
    };

    serviceInstance.tablingHash = function(slots){
      h = {};
      seen = new Set();
      for(var i=0;i<slots.length;i++){
        slot = slots[i];
        day = dayInt(slot.time);
        if(!seen.has(day)){
          seen.add(day);
          h[day] = [];
        }
        h[day].push(slot);
      }
      return h;
    };

    serviceInstance.schedule = function(email, callback){
      console.log('getting schedule for '+email);
      q = new Parse.Query(Commitments);
      q.equalTo('member_email', email);
      q.find({
        success:function(data){
          callback(data[0].get('commitments'));
        }
      });
    };
    serviceInstance.timeString = function(time){
        return timeToString(time);
    }
    serviceInstance.dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    serviceInstance.tablingDays = [0,1,2,3,4];

    return serviceInstance;
});


/**
* Tabling Utils
*/
function timeToString(time){
    return dayString(time) + " at "+hourString(time);
}
function hourString(time){
    t = (time % 24) % 12;
    if(t==0){
        t = 12;
    }
    return t.toString()+':00';
}
function dayString(time){
    days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    return days[Math.floor(time / 24)];
}

function dayInt(time){
  return Math.floor(time/24);
}

