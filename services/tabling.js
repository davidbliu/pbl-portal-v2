

app.service("TablingService",  function($http, $rootScope) {
    var serviceInstance = {};
    serviceInstance.tablingSlots = function(callback){
        if($rootScope.tablingSlots != null){
          callback($rootScope.tablingSlots);
          return;
        }
        $http.get(tokenizedURL(ROOT_URL+'/tabling_slots'))
            .success(function(data){
              $rootScope.tablingSlots = data;
                callback(data);
            });
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

    serviceInstance.schedule = function(callback){
      $http.get(tokenizedURL(ROOT_URL+'/schedule'))
        .success(function(data){
          callback(data);
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

