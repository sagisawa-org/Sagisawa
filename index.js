const client = require("./src/structures/client.js");
const Sagisawa = new client({ fetchAllMembers: true });
const { readdir } = require("fs");
Sagisawa.init();

readdir("./src/commands", (err, files) => {
  for (var file of files) {
    Sagisawa.loadCommand(file);
  }
});

Sagisawa.on("ready", () => {
  console.log(`${Sagisawa.tag} is now online!`);
  //   Sagisawa.api.applications(Sagisawa.user.id).commands.post({
  //     data: {
  //       name: "avatar",
  //       description: "View a user's avatar",
  //     },
  //   });
});

Sagisawa.ws.on("INTERACTION_CREATE", async (interaction) => {
  if (Sagisawa.commands.has(interaction.data.name)) {
    var Command = Sagisawa.commands.get(interaction.data.name);
    var Executed = Command.run({ client: Sagisawa, data: interaction.data });
    var Data = {
      data: {
        type: 4,
        data: {
          content: Executed.content,
          embeds: Executed.embeds || [],
        },
      },
    };

    if (Command.config.whisper) Data.data.data.flags = "64";
    Sagisawa.api
      .interactions(interaction.id, interaction.token)
      .callback.post(Data);
  } else {
    console.log("Lmao you need to delete this command endpoint");
  }
});
