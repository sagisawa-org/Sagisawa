module.exports = class extends (
  require("../../../Structures").command
) {
  constructor() {
    super({
      name: "emojis",
      description: "Display a list of emojis in the guild",
      category: "information",
      botPerms: ["EMBED_LINKS"],
    });
  }

  run({ message, i18n }) {
    return {
      embed: {
        title: i18n.COMMANDS.EMOJIS.EMBED.TITLE.replace(
          "{guildName}",
          message.guild.name
        ),
        description: message.guild.emojis.cache.map((f) => f).join("")
      },
    };
  }
};
