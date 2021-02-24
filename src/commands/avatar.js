module.exports = class extends require("../structures/command") {
  constructor() {
    super({ name: "avatar", whisper: false });
  }

  run({ client, data }) {
    var user = client.users.cache.get(data.options[0].value);
    console.log(user);
    return {
      content: "",
      embeds: [
        {
          title: `${user.tag}'s Avatar`,
          image: { url: user.displayAvatarURL() },
        },
      ],
    };
  }
};
