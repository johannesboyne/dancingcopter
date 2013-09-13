var keypress = require('keypress');
var arDrone = require('ar-drone');
var control = arDrone.createUdpControl();

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

var keyMapper = {
  'w'     : function () { pcmd.back             = pcmd.back < -0.3 ? -0.3 : (pcmd.back - 0.1)  } , // front
  'a'     : function () { pcmd.left             = pcmd.left > 0.5 ? 0.5 : (pcmd.left + 0.1) } , // left
  's'     : function () { pcmd.back             = pcmd.back > 0.3 ? 0.3 : (pcmd.back + 0.1) } , // back
  'd'     : function () { pcmd.left             = pcmd.left < -0.5 ? -0.5 : (pcmd.left - 0.1)  } , // right
  'right' : function () { pcmd.clockwise        = pcmd.clockwise > 0.5 ? 0.5 : (pcmd.clockwise + 0.1) }, // counter-clockwise
  'left'  : function () { pcmd.clockwise        = pcmd.clockwise < -0.5 ? -0.5 : (pcmd.clockwise - 0.1) } , // clockwise
  'up'    : function () { pcmd.down             = pcmd.down < -0.5 ? -0.5 : (pcmd.down - 0.1)  } , // up
  'down'  : function () { pcmd.down             = pcmd.down > 0.5 ? 0.5 : (pcmd.down + 0.1) } , // down
  'x'     : function () { ref.fly               = false; pcmd = {}; } , // land
  'y'     : function () { ref.fly               = true } , // takeoff
  'e'     : function () {setTimeout(function () { process.exit(1); }, 200);}, // close repl
  'q'     : function () {
    clearIt();  
  }
}

function roundIt () {
  for (var i = 0; i < Object.keys(pcmd).length; i++) {
    pcmd[Object.keys(pcmd)[i]] = Math.round(pcmd[Object.keys(pcmd)[i]] * 100)/100;
  };
}

function mapCommand (k) {
  console.log(k);
  keyMapper[k]();
}

function putCloseToZero () {
  for (var i = 0; i < Object.keys(pcmd).length; i++) {
    if (pcmd[Object.keys(pcmd)[i]] >= 0.05)
      pcmd[Object.keys(pcmd)[i]] -= 0.05
    else if (pcmd[Object.keys(pcmd)[i]] <= -0.05)
      pcmd[Object.keys(pcmd)[i]] += 0.05
    else 
      pcmd[Object.keys(pcmd)[i]] = 0;
  };
  roundIt();
}

setInterval(function () {
  putCloseToZero();
}, 80);

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
