var arDrone = require('ar-drone');
var client = arDrone.createClient();


client
  .after(100, function() {
    this.stop();
  }).after(1000, function() {
    process.exit(code=0);
  });