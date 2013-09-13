var arDrone = require('ar-drone');
var client = arDrone.createClient();

client.after(100, function() {
    this.counterclockwise(1);
  })
  .after(10000, function() {
    this.stop();
  }).after(500, function() {
    process.exit(code=0);
  });
