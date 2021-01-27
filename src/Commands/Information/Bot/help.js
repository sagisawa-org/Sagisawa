const { parseTimeMS } = require("../../../Util");
module.exports = class extends (
  require("../../../Structures").command
) {
  constructor() {
    super({
      name: "help",
      category: "information",
      usage: "{c} <command>",
      aliases: ["h", "?"],
      botPerms: ["EMBED_LINKS"],
      description: "Displays a neat list of the bot's commands.",
    });
  }

  async run({ message, args, client, i18n }) {
    var {
      settings: { prefix },
    } = await client.guildDB.findOne({ _id: message.guild.id });
    if (!args[0]) {
      // Means there is no command that is being specified, so display them all.
      var embed = {
        author: {
          name: i18n.COMMANDS.HELP.EMBED.TITLE_1.replace(
            "{botName}",
            client.user.username
          ),
          icon_url: client.user.displayAvatarURL(),
        },
        fields: new Array(),
        footer: {
          text: i18n.COMMANDS.HELP.EMBED.FOOTER_1.replace(
            "{guildName}",
            message.guild.name
          ).replace("{prefix}", prefix),
        },
      };

      var groups = new Array();

      client.commands.forEach((f) => {
        if (groups.includes(f.help.category.toLowerCase())) return;
        groups.push(f.help.category.toLowerCase());
      });

      groups.sort().forEach((group) => {
        if (
          group === "developer" &&
          !client.config.developers.includes(message.author.id)
        )
          return;
        embed.fields.push({
          name:
            group.split("")[0].toUpperCase() +
            group.split("").slice(1).join(""),
          value: `\`${client.commands
            .filter(
              (command) =>
                command.help.category.toLowerCase() === group &&
                command.config.enabled
            )
            .map((command) => command.help.name)
            .join("`, `")}\``,
        });
      });
      // I like to return things to the command handler more than sending them in the actual command, i like it more just because if i wanted to i could check what is in the message content in the handler. It would be good for say an "eval" command, which takes uer input from discord and runs it through node. Which could be used to return harmful information.
      return { embed };
    } else {
      if (
        client.commands.has(args[0].toLowerCase()) ||
        client.aliases.has(args[0].toLowerCase())
      ) {
        const Command =
          client.commands.get(args[0].toLowerCase()) ||
          client.commands.get(client.aliases.get(args[0].toLowerCase));

        return {
          embed: {
            title:
              Command.help.name.split("")[0].toUpperCase() +
              Command.help.name.slice(1).toLowerCase(),
            fields: [
              {
                name: i18n.COMMANDS.HELP.SPECIFIC_COMMAND.FIELD_0,
                value: Command.help.description,
              },
              {
                name: i18n.COMMANDS.HELP.SPECIFIC_COMMAND.FIELD_1,
                value: Command.help.usage.replace(
                  "{c}",
                  `${client.config.prefix}${Command.help.name}`
                ),
              },
              {
                name: i18n.COMMANDS.HELP.SPECIFIC_COMMAND.FIELD_2,
                value:
                  Command.config.aliases.length === 0
                    ? "None"
                    : `\`${Command.config.aliases.join("`, `")}\``,
              },
              {
                name: i18n.COMMANDS.HELP.SPECIFIC_COMMAND.FIELD_3,
                value: parseTimeMS(Command.config.cooldown),
              },
            ],
            footer: {
              text: i18n.COMMANDS.HELP.SPECIFIC_COMMAND.FOOTER.replace(
                "{timesRan}",
                Command.help.timesUsed
              ),
            },
          },
        };
      } else {
        return `Command \`${args[0].toLowerCase()}\` does not exist.`;
      }
    }
  }
};
