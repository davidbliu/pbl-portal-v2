

app.service("PointsService",  function($http) {
    var serviceInstance = {};
    serviceInstance.parseMemberPoints = function(email, callback){
      emQuery = new Parse.Query(EventMember); 
      emQuery.equalTo('member_email', email);
      emQuery.find({
        success:function(data){
          eids = [];
          for(var i=0;i<data.length;i++){
            eids.push(data[i].get('event_id'));
          }
          console.log('these are your eids');
          console.log(eids);
          eQuery = new Parse.Query(Event);
          eQuery.containedIn('google_id', eids);
          eQuery.find({
            success:function(results){
              points = 0;
              attendance = [];
              for (var i=0;i<results.length;i++){
                console.log(results[i].get('points'));
                pts = results[i].get('points') || 0;
                points = points + pts;
                event = {};
                event.name = results[i].get('name');
                event.points = results[i].get('points');
                attendance.push(event);
              }
              r = {};
              r.attendance = attendance;
              r.points = points;
              callback(r);
            }
          });
        }
      });
    };
    serviceInstance.getMemberPoints = function(email, callback){
        $http.get(tokenizedURL(ROOT_URL+'/get_member_points?email='+encodeURIComponent(email)))
            .success(function(data){
                callback(data);
            });
    };
    serviceInstance.getEvents = function(callback){
      $http.get(tokenizedURL(ROOT_URL+'/events'))
        .success(function(data){
          callback(data);
        });
    };
    serviceInstance.getEventHash = function(callback){
      $http.get(tokenizedURL(ROOT_URL+'/events'))
        .success(function(data){
          h = {};
          for(var i=0;i<data.length;i++){
            h[data[i].google_id] = data[i];
          }
          callback(h);
        });
    };
    return serviceInstance;
});
