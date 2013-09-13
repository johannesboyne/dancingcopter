var keypress = require('keypress');
var arDrone = require('ar-drone');
var control = arDrone.createUdpControl();

var ref  = {};
var pcmd = {};

ref.emergency = true;

// make `process.stdin` begin emitting "keypress" events
keypress(process.stdin);

function clearIt () {
  pcmd.front = 0;
  pcmd.left = 0;
  pcmd.back = 0;
  pcmd.right = 0;
  pcmd.clockwise = 0;
  pcmd.counterClockwise = 0;
  pcmd.up = 0;
  pcmd.down = 0;
}

clearIt();

var keyMapper = {
  'w'     : function () { pcmd.back             = pcmd.back - 0.1  } , // front
  'a'     : function () { pcmd.left             = pcmd.left + 0.1 } , // left
  's'     : function () { pcmd.back             = pcmd.back + 0.1 } , // back
  'd'     : function () { pcmd.left             = pcmd.left - 0.1  } , // right
  'right' : function () { pcmd.clockwise        = pcmd.clockwise + 0.1 }, // counter-clockwise
  'left'  : function () { pcmd.clockwise        = pcmd.clockwise - 0.1} , // clockwise
  'up'    : function () { pcmd.down             = pcmd.down - 0.1  } , // up
  'down'  : function () { pcmd.down             = pcmd.down + 0.1 } , // down
  'x'     : function () { ref.fly               = false } , // land
  'y'     : function () { ref.fly               = true } , // takeoff
  'e'     : function () {setTimeout(function () { process.exit(1); }, 200);}, // emergency
  'q'     : function () {
    clearIt();  
  }
}

function mapCommand (k) {
  // clearIt();

  console.log(k);
  keyMapper[k]();
}

setInterval(function () {
  console.log(ref);
  console.log(pcmd);
}, 1000);

setInterval(function () {
  control.ref(ref);
  control.pcmd(pcmd);
  control.flush();
}, 30);

process.stdin.on('keypress', function (ch, key) {
  mapCommand(key.name);
});

process.stdin.setRawMode(true);
process.stdin.resume();
