var e = new Date();
var x = e.getTime();
// Add analogue hand with Date() obj times by whatever, put that in the Vector2 for position
// 144/60 = 2.4 (for the minute hand)
// Import required modules
var UI = require('ui');
var Vector2 = require('vector2');

console.log('Ready!');

// Create the window
var mainFace = new UI.Window({ fullscreen: true });

// This is the part you see as the time. Code fairly self-explanatory
var theTime = new UI.TimeText({
  position: new Vector2(1,14),
  size: new Vector2(143,140),
  font: 'bitham-42-light',
  textAlign: 'center',
  text: '%H\n%M\n%S',
  color: 'black'
});

// This is the circle background
var circ = new UI.Circle({
  position: new Vector2(72,84),
  radius: 64,
  backgroundColor: 'white'
});

var minBar = new UI.Rect({
  position: new Vector2(0,0),
  size: new Vector2(144,12),
  backgroundColor: 'white'
});
var hourBar = new UI.Rect({
  position: new Vector2(0,156),
  size: new Vector2(144,12),
  backgroundColor: 'white'
});
// Add the elements to the mainFace window, with specific ordering
mainFace.add(minBar);
mainFace.add(hourBar);
mainFace.add(circ);
mainFace.add(theTime);

// Display window to user
mainFace.show();

// Create the "hands" to indicate minutes and hours
var minHand = new UI.Rect({color: 'black', backgroundColor: 'black'});
var hourHand = new UI.Rect({color:'black', backgroundColor: 'black'});

// Getting initial hand position with the Date() object 
var mins1 = e.getMinutes();
var pos2 = Math.round(mins1*2.4);
var hrs1 = e.getHours();
var pos3 = hrs1*6;
minHand.position(new Vector2(pos2,0));
minHand.size(new Vector2(2,12));
hourHand.position(new Vector2(pos3,156));
hourHand.size(new Vector2(2,12));

// Add the hands to the display
mainFace.add(hourHand);
mainFace.add(minHand);

// Set the interval for updating clock hands
setInterval(updateMins,30000); // 30 seconds
setInterval(updateHours,300000); // 5 minutes


// Functions for updating hand position based on time

// Minute hand
function updateMins() {
  var d = new Date();
  var mins = d.getMinutes();
  var pos1 = Math.round(mins*2.4);
  
  minHand.position(new Vector2(pos1,0));
}

// Hour hand
function updateHours() {
  var d = new Date();
  var hours = d.getHours();
  var pos1 = hours*6;
  
  hourHand.position(new Vector2(pos1,156));
}

var f = new Date();
var y = f.getTime();
var z1 = x-y;
var z = z1-z1-z1;
console.log('Fully loaded in ' + z + ' milliseconds.');