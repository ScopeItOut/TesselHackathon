var tessel = require('tessel');

// var camera = require('camera-vc0706').use(tessel.port['A']);
var ambient = require('ambient-attx4').use(tessel.port['B']);

ambient.on('ready', function () {
 // Get points of light and sound data.
  setInterval( function () {
    
      ambient.getSoundLevel( function(err, sdata) {
        console.log("Sound Level:", sdata.toFixed(8));
    });
  }, 1000); // The readings will happen every .5 seconds unless the trigger is hit

  

  // Set a sound level trigger - The trigger is a float between 0 and 1
  ambient.setSoundTrigger(0.1);

  ambient.on('sound-trigger', function(data) {
    console.log("Something happened with sound: ", data);

    // Clear it
    ambient.clearSoundTrigger();

    //After 1.5 seconds reset sound trigger
    setTimeout(function () {

        ambient.setSoundTrigger(0.1);

    },1500);

  });
});

ambient.on('error', function (err) {
  console.log(err)
});