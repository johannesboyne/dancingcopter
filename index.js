var keypress = require('keypress');
var arDrone = require('ar-drone');
var control = arDrone.createUdpControl();

var timer;

var ref  = {};
var pcmd = {};

ref.emergency = true;

// make `process.stdin` begin emitting "keypress" events
keypress(process.stdin);

function clearIt () {
  pcmd.left = 0;
  pcmd.back = 0;
  pcmd.clockwise = 0;
  pcmd.down = 0;
}

clearIt();

var speed = 0.1;

var keyMapper = {
  'w'     : function () { pcmd.back             = -speed  } , // front
  'a'     : function () { pcmd.left             = speed } , // left
  's'     : function () { pcmd.back             = speed } , // back
  'd'     : function () { pcmd.left             = -speed  } , // right
  'right' : function () { pcmd.clockwise        = speed }, // counter-clockwise
  'left'  : function () { pcmd.clockwise        = -speed} , // clockwise
  'up'    : function () { pcmd.down             = -speed  } , // up
  'down'  : function () { pcmd.down             = speed } , // down
  'x'     : function () { ref.fly               = false } , // land
  'y'     : function () { ref.fly               = true } , // takeoff
  'e'     : function () {setTimeout(function () { process.exit(1); }, 200);}, // emergency
  'q'     : function () {
    clearIt();  
  }
}


function mapCommand (k) {
  // console.log(k);
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

  if (key.ctrl) {
    speed = 0.3;
  } else {
    speed = 0.1;
  }

  mapCommand(key.name);
  clearTimeout(timer);

  timer = setTimeout(function () {
    console.log('clear!');
    clearIt();
  }, 1000);
});

process.stdin.setRawMode(true);
process.stdin.resume();
