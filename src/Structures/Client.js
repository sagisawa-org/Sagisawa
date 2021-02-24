const { Client, Collection } = require("discord.js");

module.exports = class extends Client {
  constructor(options = {}) {
    super(options);
    this.config = require("../../config.json");
    this.commands = new Collection();
  }

  init() {
    this.login(this.config.token);
  }

  loadCommand(file) {
    if (file.includes(".json")) return;
    if (!file.includes(".js")) {
      readdir(`./src/commands/${file}`, (err, files) => {
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
        console.log(
          `\u001b[38;5;33mCommand \u001b[31m${Command.help.name}\u001b[38;5;33m loaded successfully\u001b[39m`
        );
      } catch (e) {}
    }
  }
};
