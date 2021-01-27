module.exports = class {
  constructor({
    name = `Command ${Math.floor(Math.random() * 999)}`, // did this to help prevent naming issues if i forget to name a few commands, could just default the name to the file path though, not sure what i want to do.
    description = "None",
    usage = "{c}", // "{c}" means the command name/prefix, args are added in the command file and then displayed in the help command.
    category = "Miscellaneous",
    timesUsed = 0, // Display the amount of times the command has been used in the help menu, although could be used on the website dashboard for command popularity and deciding which commands should stay and go.
    cooldown = 3000, // Just a cooldown, time is in MS
    aliases = new Array(),
    botPerms = new Array().concat("SEND_MESSAGES"),
    userPerms = new Array().concat("SEND_MESSAGES"),
    nsfw = false, // Says if the command is NSFW or not, NSFW is handled in the message event. Guilds will have the option to lock nsfw commands to NSFW channels or not.
    args = new Array(), // Not really sure if this argument will even get used to be honest, im just adding it now for future proofing.
    developer = false,
    enabled = true,
  }) {
    this.help = {
      name,
      description,
      usage,
      category,
      timesUsed,
    };
    this.config = {
      aliases,
      botPerms,
      userPerms,
      args,
      nsfw,
      developer,
      enabled,
      cooldown,
      filePath: null,
    };
  }
};
