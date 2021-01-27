module.exports = class extends (
  require("../../../Structures").command
) {
  constructor() {
    super({
      name: "ping",
      category: "information",
      description: "View the bots ping.",
      botPerms: ["EMBED_LINKS"],
    });
  }
  // This command doesnt really need i18n, since it is just showing a number and MS.
  run({ client }) {
    return {
      embed: { description: `⏳ ${client.ws.ping} ms` },
    };
  }
};
