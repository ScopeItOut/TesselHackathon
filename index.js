var util = require('util');
var twitter = require('twitter');
var twit = new twitter({
    consumer_key: 'iu4DxyyfZuUuOEkEcJ8cnK4PI',
    consumer_secret: 'M8QnfjczwmAFrsMrQpPqzNNeJDTJLQ2nZHr9k2jh0mfvXjDqt5',
    access_token_key: '2660028410-kKaP8jnAIsxw6VIzsP75hWjAHQUROamBKpqIIEM',
    access_token_secret: 'dXGr78LyRoj0R1VDzfNR1GVKCFojSxDu6VF7jOksgYjfr'
});

var latestTweets = [];
var latestId = '490565814072782848';

var postTweets = function(){
  while(latestTweets.length > 0){
    var currentResponse = latestTweets.pop();
    var responseMsg = 'Hello @' + currentResponse.user;
    // twit.updateStatus(responseMsg, function(data){
    //   console.log(data);
    // });
    console.log(responseMsg);
  }

  // twit.updateStatus(tweetString,
  //   function(data) {
  //     console.log(data);
  //   }
  // );  
};

var getMentions = function(){
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
        console.log(latestTweets);
      }
      postTweets();
      console.log(latestTweets);      
    }
  });
};




getMentions();

setInterval(function(){
  getMentions();
}, 61000);