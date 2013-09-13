var arDrone = require('ar-drone');
var client = arDrone.createClient();

client.takeoff();

client
  .after(7000, function() {
    this.up(1);
  })
  .after(1000, function() {
    process.exit(code=0);
  });
