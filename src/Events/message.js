const { logger } = require("../Util");
const {
  database: { Guild },
} = require("../Structures");
module.exports = class {
  constructor(client) {
    this.client = client;
  }

  async run(message) {
    if (message.author.bot || message.channel.type === "dm") return;

    if (
      await this.client.guildDB
        .countDocuments({ _id: message.guild.id }, { limit: 1 })
        .then((res) => res === 0)
    ) {
      await this.client.guildDB.insertOne(Guild(message.guild));
    }

    var {
      settings: { i18n, prefix },
    } = await this.client.guildDB.findOne({ _id: message.guild.id });
    if (message.content.startsWith(prefix)) {
      var Command = message.content
        .split(" ")[0]
        .slice(prefix.length)
        .toLowerCase();
      var Args = message.content.split(" ").slice(1);
      if (
        !this.client.commands.has(Command) &&
        !this.client.aliases.has(Command)
      )
        return;
      Command =
        this.client.commands.get(Command) ||
        this.client.commands.get(this.client.aliases.get(Command));

      if (
        !this.client.config.developers.includes(message.author.id) &&
        Command.config.developer
      ) {
        message.channel.send({
          embed: {
            title: "You must be a developer to run this command",
            color: 14677957,
          },
        });
      } else if (
        !Command.config.botPerms.every(
          (perm) => message.guild.member(this.client.user).hasPermission
        )
      ) {
        message.channel.send(
          `I require ${Command.config.botPerms.filter(
            (perm) =>
              !message.guild
                .member(this.client.user)
                .hasPermission(perm)
                .map((r) => r.split("_").join(" "))
                .join(", `")
          )}\` permissions.`
        );
      } else if (
        !Command.config.userPerms.every((perm) =>
          message.member.hasPermission(perm)
        )
      ) {
        message.channel.send(
          `You require \`${Command.config.userPerms
            .filter((perm) => !message.member.hasPermission(perm))
            .map((r) => r.split("_").join(" "))
            .join(", `")}\` permissions.`
        );
      } else {
        this.client.commandsRan++;
        Command.help.timesUsed++;
        var res = await Command.run({
          client: this.client,
          message,
          args: Args,
          i18n: require(`../../i18n/${i18n}.json`), //.COMMANDS[Command.help.name.toUpperCase()],
        });

        if (res) {
          if (typeof res === "string") {
            message.channel.send(res);
          } else if (typeof res === "object") {
            if (!res.embed.color) res.embed.color = 14677957;
            message.channel.send(res);
          }
          logger.debug(
            `\u001b[31m${message.author.tag}\u001b[38;5;33m ran command \u001b[31m${Command.help.name}\u001b[39m ("${message.content}")`
          );
        }
      }
    }
  }
};
