const { logger } = require("../Util");

module.exports = class {
  constructor(client) {
    this.client = client;
  }

  async run() {
    logger.debug(
      `\u001b[31m${this.client.commands.size} \u001b[38;5;33mCommands Loaded, \u001b[31m${this.client.aliases.size} \u001b[38;5;33mAliases, \u001b[31m${this.client._eventsCount} \u001b[38;5;33mEvents!\u001b[39m`
    );
    this.client.channels.cache
      .get("663898511611396113")
      .setName(`Users: ${this.client.users.cache.size}`);
    this.client.channels.cache
      .get("663898578955272202")
      .setName(`Guilds: ${this.client.guilds.cache.size}`);
  }
};
