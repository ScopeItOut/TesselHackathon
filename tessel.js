var tessel = require('tessel');
var keys = require('./keys.js');
var util = require('util');
var twitter = require('twitter');
var wit = require('./wit.js');
var path = require('path');
var twit = new twitter({
    consumer_key: keys.consumer_key,
    consumer_secret: keys.consumer_secret,
    access_token_key: keys.access_token_key,
    access_token_secret: keys.access_token_secret
});

var otherTwitter = require('node-twitter');
var twitterRestClient = new otherTwitter.RestClient(
  keys.consumer_key,
  keys.consumer_secret,
  keys.access_token_key,
  keys.access_token_secret
);

setInterval(function(){

var latestId = '490565814072782848';

var dummyNoise = 'It\'s so loud!';
var dummyImage = '/thermometer-01.jpg';
var dummyTemperature = '98º';


var postTweet = function(str){
  
  twit.updateStatus(str, function(){
    console.log(str);
  });
};

var postTweetImage = function(str){
  //https://api.twitter.com/1.1/statuses/update_with_media.json
  //Twitter.prototype.post = function(url, content, content_type, callback)
  twitterRestClient.statusesUpdateWithMedia({
    'status': str,
    'media[]': path.join(__dirname, dummyImage)
    },
    function(error, result) {
      if(error){
        console.log('Error: ' + (error.code ? error.code + ' ' + error.message : error.message));
      }
      if(result){
        console.log(str);
      }
    }
);
};

var getMentions = function(callback){
  latestTweets = [];
  twit.get('/statuses/mentions_timeline.json', { count: 10, since_id : latestId}, function(data){
    if(data.length === 0){
      console.log('No New Mentions!');
    } else {
      latestId = data[0].id_str;
      for(var i = 0; i < data.length; i++){
        var currentTweet = data[i];
        var responseObj = {};
        responseObj.user =  currentTweet.user.screen_name;
        responseObj.text = currentTweet.text;
        latestTweets.push(responseObj);
      }
      callback(latestTweets);

    }
  });

};


var app = function() {
  var noiseResponse = '\nThe noise level is currently: ' + dummyNoise;
  var photoResponse = '\nHere\'s a photo of the space: ';
  var temperatureResponse = '\n The temperature is always perfect here!';

  getMentions(function(data) {
    for (var i = 0; i < data.length; i ++ ) {
      wit.getWitForMessage(data[i], function(witResponse) {
        var responseMsg = 'Hello @' + witResponse.message.user + ":";
        if(witResponse.intent === 'general_conditions'){
          responseMsg += noiseResponse;
          responseMsg += temperatureResponse;
          responseMsg += photoResponse;
          postTweetImage(responseMsg);
        }
        else if(witResponse.intent === 'noise_level'){
          responseMsg += noiseResponse;
          postTweet(responseMsg);
        }
        else if(witResponse.intent === 'photo'){
          responseMsg += photoResponse;
          postTweetImage(responseMsg);
        }
        else if(witResponse.intent === 'temperature'){
          responseMsg += temperatureResponse;
          postTweet(responseMsg);
        }
      });
    }
  });
};

app();

//have access to variables on server
//with results from server, post tweet
  //construct tweet with username, text, photo?
//get all at mentions
//pass along new ones to wit
//take result from wit, pass to neil
//neil will send back tweet text or image
//take this and tweet it at the mentioner



// getMentions();

// setInterval(function(){
//   getMentions();
// }, 61000);
