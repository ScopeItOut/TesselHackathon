var tessel = require('tessel');
var https = require('https');
var crypto = require('crypto');

var twitterHandle = '@HackReactor';

// The status to tweet
var status = 'Hello ' + twitterHandle + '. This is your #Tessel speaking.';
// Timestamp
var curtime = parseInt(process.env.DEPLOY_TIMESTAMP || Date.now());

// Copy your own keys here if you want
// var oauth_consumer_key = "iu4DxyyfZuUuOEkEcJ8cnK4PI";
// var oauth_consumer_secret = "M8QnfjczwmAFrsMrQpPqzNNeJDTJLQ2nZHr9k2jh0mfvXjDqt5";
// var oauth_access_token = "2660028410-kKaP8jnAIsxw6VIzsP75hWjAHQUROamBKpqIIEM";
// var oauth_access_secret = "dXGr78LyRoj0R1VDzfNR1GVKCFojSxDu6VF7jOksgYjfr";

// // Set up OAuth
// var oauth_data = {
//   oauth_consumer_key: oauth_consumer_key,
//   oauth_nonce: crypto.pseudoRandomBytes(32).toString('hex'),
//   oauth_signature_method: 'HMAC-SHA1',
//   oauth_timestamp: Math.floor(curtime / 1000),
//   oauth_token: oauth_access_token,
//   oauth_version: '1.0'
// };
// oauth_data.status = status;
// var out = [].concat(
//   ['POST', 'https://api.twitter.com/1.1/statuses/update.json'],
//   (Object.keys(oauth_data).sort().map(function (k) {
//     return encodeURIComponent(k) + '=' + encodeURIComponent(oauth_data[k]);
//   }).join('&'))
// ).map(encodeURIComponent).join('&');
// delete oauth_data.status;
// oauth_data.oauth_signature = crypto
//   .createHmac('sha1', [oauth_consumer_secret, oauth_access_secret].join('&'))
//   .update(out)
//   .digest('base64');
// var auth_header = 'OAuth ' + Object.keys(oauth_data).sort().map(function (key) {
//   return key + '="' + encodeURIComponent(oauth_data[key]) + '"';
// }).join(', ');

// // Set up a request
// var req = https.request({
//   port: 443,
//   method: 'GET',
//   hostname: 'api.twitter.com',
//   path: '/1.1/statuses/mentions_timeline.json?count=2',
//   headers: {
//     Host: 'api.twitter.com',
//     'Accept': '*/*',
//     "User-Agent": "tessel",
//     'Authorization': auth_header,
//     'Content-Type': 'application/x-www-form-urlencoded',
//     'Connection': 'keep-alive'
//   }
// }, function (res) {
//   console.log("statusCode: ", res.statusCode);
//   console.log("headers: ", res.headers);
//   res.on('data', function(d) {
//     console.log(' ');
//     console.log(' ');
//     console.log(String(d));
//   });
// });

// // POST to Twitter
// req.write('status=' + encodeURIComponent(status));
// req.end();

// // Log any errors
// req.on('error', function(e) {
//   console.error(e);
// });



// Twitter OAuth
var qs = require('querystring')
  , oauth =
    { callback: 'http://mysite.com/callback/'
    , consumer_key: "iu4DxyyfZuUuOEkEcJ8cnK4PI"
    , consumer_secret: "M8QnfjczwmAFrsMrQpPqzNNeJDTJLQ2nZHr9k2jh0mfvXjDqt5"
    }
  , url = 'https://api.twitter.com/oauth/request_token'
  ;
request.post({url:url, oauth:oauth}, function (e, r, body) {
  // Ideally, you would take the body in the response
  // and construct a URL that a user clicks on (like a sign in button).
  // The verifier is only available in the response after a user has
  // verified with twitter that they are authorizing your app.
  var access_token = qs.parse(body)
    , oauth =
      { consumer_key: "iu4DxyyfZuUuOEkEcJ8cnK4PI"
      , consumer_secret: "M8QnfjczwmAFrsMrQpPqzNNeJDTJLQ2nZHr9k2jh0mfvXjDqt5"
      , token: "2660028410-kKaP8jnAIsxw6VIzsP75hWjAHQUROamBKpqIIEM"
      , verifier: "dXGr78LyRoj0R1VDzfNR1GVKCFojSxDu6VF7jOksgYjfr"
      }
    , url = 'https://api.twitter.com/oauth/access_token'
    ;
  request.post({url:url, oauth:oauth}, function (e, r, body) {
    var perm_token = qs.parse(body)
      , oauth =
        { consumer_key: "iu4DxyyfZuUuOEkEcJ8cnK4PI"
        , consumer_secret: "M8QnfjczwmAFrsMrQpPqzNNeJDTJLQ2nZHr9k2jh0mfvXjDqt5"
        , token: perm_token.oauth_token
        , token_secret: perm_token.oauth_token_secret
        }
      , url = 'https://api.twitter.com/1.1/users/show.json?'
      , params =
        { screen_name: perm_token.screen_name
        , user_id: perm_token.user_id
        }
      ;
    url += qs.stringify(params)
    request.get({url:url, oauth:oauth, json:true}, function (e, r, user) {
      console.log(user)
    })
  })
})
