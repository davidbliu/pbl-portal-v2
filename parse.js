Parse.initialize(PARSE_APP_ID, PARSE_JS_KEY);
var Member = Parse.Object.extend("ParseMember");
var Golink = Parse.Object.extend("ParseGoLink");
var ParseGoLink = Parse.Object.extend("ParseGoLink");
var Blog = Parse.Object.extend("BlogPost");
var BlogPost = Parse.Object.extend("BlogPost");
var Event = Parse.Object.extend("ParseEvent");
var EventMember = Parse.Object.extend("ParseEventMember");
var TablingSlot = Parse.Object.extend("ParseTablingSlot");
var Attendance = Parse.Object.extend("Attendance");
var Commitments = Parse.Object.extend("Commitments");

var ParseGoLinkFields = ['createdAt', 'key', 'url', 'image', 'description', 'member_email'];

function convertParse(parseObject, fields){
  res = {};
  _.each(fields, function(field){
    res[field] = parseObject.get(field);
  });
  res.objectId = parseObject.id;
  return res;
}

function convertParseObjects(parseObjects, fields){
  return _.map(parseObjects, function(obj){
    return convertParse(obj, fields);
  });
}
