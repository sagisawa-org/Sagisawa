module.exports = class extends (
  require("../../../Structures").command
) {
  constructor() {
    super({
      name: "about",
      description: "View some general information about the bot",
      category: "information",
      cooldown: 0,
      aliases: ["ab"],
    });
  }

  run({ client, i18n }) {
    return {
      embed: {
        title: i18n.COMMANDS.ABOUT.EMBED.TITLE.replace(
          "{username}",
          client.user.username
        ),
        description: i18n.COMMANDS.ABOUT.EMBED.DESCRIPTION.replace(
          "{username}",
          client.user.username
        ),
      },
    };
  }
};
