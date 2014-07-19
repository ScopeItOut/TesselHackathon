var tessel = require('tessel');
var util = require('util');

console.log("im here");

var twitter = require('twitter');
var wit = require('./wit.js');
var twit = new twitter({
    consumer_key: 'iu4DxyyfZuUuOEkEcJ8cnK4PI',
    consumer_secret: 'M8QnfjczwmAFrsMrQpPqzNNeJDTJLQ2nZHr9k2jh0mfvXjDqt5',
    access_token_key: '2660028410-kKaP8jnAIsxw6VIzsP75hWjAHQUROamBKpqIIEM',
    access_token_secret: 'dXGr78LyRoj0R1VDzfNR1GVKCFojSxDu6VF7jOksgYjfr'
});


var latestId = '490565814072782848';

var postTweets = function(tweets){
  while(tweets.length > 0){
    var currentResponse = tweets.pop();
    var responseMsg = 'Hello @' + currentResponse.user;
    twit.updateStatus(responseMsg, function(){
      console.log('Tweet posted to: @' + currentResponse.user);
    });
  }

  // twit.updateStatus(tweetString,
  //   function(data) {
  //     console.log(data);
  //   }
  // );  
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

  getMentions(function(data) {
    for (var i = 0; i < data.length; i ++ ) {
      var txt = 
      wit.getWitForMessage(data[i], function(witResult) {
        console.log(witResult);
        //call neil
        //with results from neil, post tweet
          //construct tweet with username, text, photo?
      });
    }
  });
};

app();

//get all at mentions
//pass along new ones to wit
//take result from wit, pass to neil
//neil will send back tweet text or image
//take this and tweet it at the mentioner



// getMentions();

// setInterval(function(){
//   getMentions();
// }, 61000);
