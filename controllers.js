app.controller('HomeCtrl', function($scope) {
  $scope.msg = 'hi';

  function pullGolinks(){
    q = new Parse.Query(ParseGoLink);
    q.descending('createdAt');
    //q.skip(100*2);
    q.find({
      success:function(parse_golinks){
        console.log('lskdfjlskdjf');
        $scope.golinks = convertParseObjects(parse_golinks, ParseGoLinkFields);
        $scope.$digest();
      }
    });
  }

  pullGolinks();
});
