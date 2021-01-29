const { Client } = require("../Structures");
var client = new Client();
const { readdir, writeFile } = require("fs");
const logger = require("./Logger");
readdir("./src/Commands", (err, files) => {
  for (var file of files) {
    client.loadCommand(file);
  }
});

writeFile(
  "./commands.json",
  JSON.stringify(Object.fromEntries(client.commands)),
  () => {
    logger.info("New commands file generated");
  }
);
