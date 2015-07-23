var e = new Date();
var x = e.getTime();
var UI = require('ui');
var Vector2 = require('vector2');
var Settings = require('settings');
var Accel = require('ui/accel');

Accel.init();

console.log('Ready!');

var topAnaOn = localStorage.getItem(1);
var topAna;
if (topAnaOn !== null) {
  if (topAnaOn == 'true') {
    topAna = 'true';
  } else {
    topAna = 'false';
  }
} else {
  topAna = 'false';
}

var botAnaOn = localStorage.getItem(2);
var botAna;
if (botAnaOn !== null) {
  if (botAnaOn == 'true') {
    botAna = 'true';
  } else {
    botAna = 'false';
  }
} else {
  botAna = 'false';
}

Settings.config(
  { url: 'https://mlb406.github.io/CircularFace' },
  function(e) {
    console.log('Config opened!');

  },
  function(e) {
    console.log('Settings recieved!');
    console.log(JSON.stringify(e.options));
    var options = e.options;
    localStorage.setItem(1, (options.bars.top).toString());
    localStorage.setItem(2, (options.bars.bottom).toString());
    localStorage.setItem(3, (options.date.on).toString());
    localStorage.setItem(4, options.date.format);
  }
);

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

mainFace.on('accelTap', function(e) {
  var dateSetting = localStorage.getItem(3);
  if (dateSetting == "true") {
    var dateFormat = localStorage.getItem(4);
    var date_format;
    if (dateFormat == "DD-MM-YY") {
      date_format = "%d-%m-%y";
    } else if (dateFormat == "MM-DD-YY") {
      date_format = "%m-%d-%y";
    }
    var dateWind = new UI.Window({ fullscreen: true });
    var dateText = new UI.TimeText({
      position: new Vector2(0,0),
      size: new Vector2(144,168),
      font: 'bitham-30-black',
      text: date_format,
      textAlign: 'center',
      textOverflow: 'wrap'
    });
    dateWind.add(dateText);
    dateWind.show();
    setTimeout(function() {
      dateWind.hide();
    }, 2000);
  } else {
    return;
  }
  
});

//Add handling if top bar is enabled
if (topAna == 'true') {
  mainFace.add(minBar);
  mainFace.add(minHand);
  setInterval(updateMins,30000); // 30 seconds, top refresh
} else {
  return; //Handle if not enabled
}

if (botAna == 'true') {
  mainFace.add(hourBar);
  mainFace.add(hourHand);
  setInterval(updateHours,300000); // 5 minutes, bottom refresh
} else {
  return;
}

var f = new Date();
var y = f.getTime();
var z1 = x-y;
var z = z1-z1-z1;
console.log('Fully loaded in ' + z + ' milliseconds.');