var arDrone = require('ar-drone');
var client = arDrone.createClient();

console.log("land");
client.after(1, function() {
    this.stop();
    this.land();
  }).after(2000, function() {
    process.exit(code=0);
  });