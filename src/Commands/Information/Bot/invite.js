module.exports = class extends (
  require("../../../Structures").command
) {
  constructor() {
    super({
      name: "invite",
      description: "Get an invite to the bot",
      cooldown: 0,
      botPerms: ["EMBED_LINKS"],
      category: "information",
    });
  }

  run({ client, i18n }) {
    return {
      embed: {
        description: i18n.COMMANDS.INVITE.EMBED.DESCRIPTION.replace(
          "{url}",
          `https://discord.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=435547254`
        ),
      },
    };
  }
};
