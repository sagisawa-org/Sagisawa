const { Client, Collection } = require("discord.js");
const { MongoClient } = require("mongodb");
const config = require("../../config.json");
const { readdir } = require("fs");
const { logger } = require("../Util");
module.exports = class extends (
  Client
) {
  constructor(options = {}) {
    super(options);
    this.commands = new Collection();
    this.aliases = new Collection();
    this.commandsRan = 0;
    this.config = config;
  }
  init() {
    this.login(config.token);
    this.initMongo();
    logger.debug(`\u001b[39mSagisawa started`);
  }

  initMongo() {
    MongoClient.connect(
      config.mongoUrl,
      { useUnifiedTopology: true },
      (err, response) => {
        if (err) {
          console.error("Could not connect to MongoDB Database!");
        } else {
          this.userDB = response.db("Sagisawa").collection("users");
          this.guildDB = response.db("Sagisawa").collection("guilds");
          logger.info(
            "\u001b[31mMongoDB \u001b[38;5;33mconnected successfully\u001b[39m"
          );
        }
      }
    );
  }

  loadCommand(file) {
    if (file.includes(".json")) return;
    if (!file.includes(".js")) {
      readdir(`./src/Commands/${file}`, (err, files) => {
        files.forEach((command) => {
          this.loadCommand(`${file}/${command}`);
        });
      });
    } else {
      if (file.startsWith("asset.")) return;
      try {
        const Command = new (require("../Commands/" + file))();
        this.commands.set(Command.help.name, Command);
        Command.config.filePath = file;
        for (var alias of Command.config.aliases) {
          this.aliases.set(alias, Command.help.name);
        }
        logger.debug(
          `\u001b[38;5;33mCommand \u001b[31m${Command.help.name}\u001b[38;5;33m loaded successfully\u001b[39m`
        );
      } catch (e) {
        logger.error(e);
      }
    }
  }
};
