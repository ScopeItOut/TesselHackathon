var request = require('request');


var wit = {
  getWitForMessage: function(message) {

    var url = 'https://api.wit.ai/message?v=20140719&q=' +
              encodeURIComponent(message);

    var options = {
      url: url,
      headers: {
        'Authorization': 'Bearer J3L5HDVCHGVDYLJRIQUHN7PKYKRP43LV'
      }
    };

    request(options, function(error, response, body) {
      if (error) {
        console.log("Error getting Wit: " + error);
      } else {
        body = JSON.parse(body);
        console.log(body["outcomes"][0]["intent"]);
        return body["outcomes"][0]["intent"];
      }

    });

  }




};



module.exports = wit;