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
            name: "Guilds",
            value: client.guilds.cache.size,
            inline: true,
          },
          {
            name: "Users",
            value: client.users.cache.size,
            inline: true,
          },
          {
            name: "Commands Used",
            value: client.commandsRan,
            inline: true,
          },
          {
            name: "Most Used Command",
            value: client.commands
              .sort((a, b) => b.help.timesUsed - a.help.timesUsed)
              .first().help.name,
            inline: true,
          },
          {
            name: "Memory Usage",
            value: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(
              2
            )} MB`,
            inline: true,
          },
          {
            name: "Uptime",
            value: moment
              .duration(Math.floor(process.uptime() * 1000))
              .format("D [days], H [hours],m [minutes]"),
            inline: true,
          },
        ],
      },
    };
  }
};
