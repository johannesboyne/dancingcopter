var arDrone = require('ar-drone');
var client = arDrone.createClient();

client.after(100, function() {
    this.clockwise(1);
  })
  .after(10000, function() {
    this.stop();
  }).after(2000, function() {
    process.exit(code=0);
  });