module.exports = class extends (
  require("../../../Structures").command
) {
  constructor() {
    super({
      name: "avatar",
      category: "information",
      aliases: ["av"],
      description: "View a user's avatar.",
    });
  }

  run({ message, i18n }) {
    var member = message.mentions.members.first() || message.member;
    return {
      embed: {
        title: i18n.COMMANDS.AVATAR.TITLE.replace(
          "{username}",
          member.user.username
        ),
        image: {
          url: member.user.displayAvatarURL(),
        },
      },
    };
  }
};
