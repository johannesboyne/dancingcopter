var arDrone = require('ar-drone');
var client = arDrone.createClient();

client.after(100, function() {
    this.front(0.3);
  }).after(2000, function() {
    process.exit(code=0);
  });