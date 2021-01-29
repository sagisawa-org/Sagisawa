module.exports = class extends (
  require("../../../Structures").command
) {
  constructor() {
    super({
      name: "roles",
      description: "View the server's roles",
      botPerms: ["EMBED_LINKS"],
      category: "information"
    });
  }

  run({ message, i18n }) {
    return {
      embed: {
        description: message.guild.roles.cache
          .map((f) => (f.id == message.guild.id ? "" : `<@&${f.id}>`))
          .slice(1)
          .join(",  "),
        footer: {
          text: i18n.COMMANDS.ROLES.FOOTER.replace(
            "{count}",
            message.guild.roles.cache.size - 1
          ),
        },
      },
    };
  }
};
