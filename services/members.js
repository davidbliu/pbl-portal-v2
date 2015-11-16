app.service("MemberService",  function($http, $rootScope) {
    var serviceInstance = {};

    serviceInstance.parseCurrentMembers = function(callback){
      query = new Parse.Query(Member);
      query.limit(MAXINT);
      query.equalTo('latest_semester', CURRENT_SEMESTER);
      query.find({
        success: function(results){
          callback(results);
        }
      });
    }

    serviceInstance.convertResults = function(results){
      console.log('converting');
      rs = [];
      for(var i=0;i<results.length;i++){
        result = results[i];
        r = {};
        r['name'] = result.get('name');
        r['position'] = result.get('position');
        r['email'] = result.get('email');
        r['major'] = result.get('major');
        r['phone'] = result.get('phone');
        r['year'] = result.get('year');
        r['committee'] = result.get('committee');
        rs.push(r);
      }
      return rs;
    };

    serviceInstance.convertResult = function (result){
      console.log('convertingresult');
      return r;
    };
  
    serviceInstance.parseMemberHash = function(callback){
      query = new Parse.Query(Member);
      query.limit(MAXINT);
      query.exists('email');
      query.find({
        success: function(results){
          members = [];
          h = {};
          for(var i=0;i<results.length;i++){
            r = {};
            r['name'] = results[i].get('name');
            r['position'] = results[i].get('position');
            r['email'] = results[i].get('email');
            r['major'] = results[i].get('major');
            r['phone'] = results[i].get('phone');
            r['year'] = results[i].get('year');
            r['committee'] = results[i].get('committee');
            h[r.email] = r;
          }
          console.log("member hash is below");
          console.log(h);
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
