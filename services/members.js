app.service("MemberService",  function($http, $rootScope) {
    var serviceInstance = {};
    serviceInstance.parseCurrentMembers = function(callback){
      query = new Parse.Query(Member);
      query.limit(MAXINT);
      query.equalTo('latest_semester', CURRENT_SEMESTER);
      query.find({
        success: function(results){
          callback(results)
        }
      });
    }

    serviceInstance.parseMemberHash = function(callback){
      query = new Parse.Query(Member);
      query.limit(MAXINT);
      query.exists('email');
      query.find({
        success: function(results){
          h = {};
          for(var i=0;i<results.length;i++){
            email = results[i].get('email');
            h[email] = results[i];
          }
          callback(h);
        }
      });
    }

    // below are using PBL API
    serviceInstance.currentMembers = function(callback){
      if($rootScope.currentMembers != null){
        callback($rootScope.currentMembers);
        return;
      }
        $http.get(tokenizedURL(ROOT_URL+'/current_members'))
            .success(function(data){
              $rootScope.currentMembers = data;
                callback(data);
            });
    };

    serviceInstance.memberHash = function(callback){
      if($rootScope.memberHash != null){
        callback($rootScope.memberHash);
        return;
      }
      $http.get(tokenizedURL(ROOT_URL+'/member_email_hash'))
          .success(function(data){
            $rootScope.memberHash = data;
              callback(data);
          });
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
