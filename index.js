const { Client } = require("./src/Structures");
const client = new Client();
const { readdir } = require("fs");

client.init();

readdir("./src/Commands", (err, files) => {
  for (var file of files) {
    client.loadCommand(file);
  }
});

readdir("./src/Events", (err, files) => {
  for (var file of files) {
    const eventName = file.split(".")[0];
    const event = new (require("./src/Events/" + file))(client);
    client.on(eventName, (...args) => {
      event.run(...args);
    });
  }
});
