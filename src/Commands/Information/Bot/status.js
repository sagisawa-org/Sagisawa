const moment = require("moment");
require("moment-duration-format");
module.exports = class extends (
  require("../../../Structures").command
) {
  constructor() {
    super({
      name: "status",
      description: "View some statistics about the bot",
      category: "information",
      aliases: ["stats", "statistics", "botstatus"],
    });
  }
  // start doing i18n you fucking idiot
  async run({ client, i18n }) {
    return {
      embed: {
        author: {
          name: client.user.username,
          icon_url: client.user.displayAvatarURL(),
        },
        fields: [
          {
            name: i18n.COMMANDS.STATUS.EMBED.FIELD_0,
            value: client.guilds.cache.size,
            inline: true,
          },
          {
            name: i18n.COMMANDS.STATUS.EMBED.FIELD_1,
            value: client.users.cache.size,
            inline: true,
          },
          {
            name: i18n.COMMANDS.STATUS.EMBED.FIELD_2,
            value: client.commandsRan,
            inline: true,
          },
          {
            name: i18n.COMMANDS.STATUS.EMBED.FIELD_3,
            value: client.commands
              .sort((a, b) => b.help.timesUsed - a.help.timesUsed)
              .first().help.name,
            inline: true,
          },
          {
            name: i18n.COMMANDS.STATUS.EMBED.FIELD_4,
            value: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(
              2
            )} MB`,
            inline: true,
          },
          {
            name: i18n.COMMANDS.STATUS.EMBED.FIELD_5,
            value: moment
              .duration(Math.floor(process.uptime() * 1000))
              .format(
                `D [${i18n.COMMANDS.STATUS.DURATION_FORMAT.D}], H [${i18n.COMMANDS.STATUS.DURATION_FORMAT.H}], m [${i18n.COMMANDS.STATUS.DURATION_FORMAT.M}]`
              ),
            inline: true,
          },
        ],
      },
    };
  }
};
