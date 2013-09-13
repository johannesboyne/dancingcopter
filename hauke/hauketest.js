var arDrone = require('ar-drone');
var client = arDrone.createClient();

client.takeoff();

client
  .after(6000, function() {
    this.up(100);
  })
  .after(1000, function() {
    this.down(100);
  })
  .after(6000, function() {
    this.up(100);
  })
  .after(1000, function() {
    this.down(100);
  })
  .after(10000, function() {
    this.stop();
    this.land();
  });
