module.exports = (guild) => {
  return {
    _id: guild.id,
    channels: {
      modlog: null,
      welcome: null,
      starboard: null,
      ignoredChannels: new Array(),
    },
    messages: {
      welcome: "Welcome {user} to {guild}! We hope you enjoy your stay.",
      leave: "Goodbye {user}",
    },
    modLogs: new Array().concat({
      case: 0,
      user: "803853866277404683",
      action: "Bot Join",
      timestamp: null,
      byWho: "803853866277404683",
      reason: null,
    }),
    settings: {
      prefix: "s!",
      i18n: "en-US",
      mod: {
        muteRole: null,
        modRole: null,
        admiinRole: null,
      },
    },
    autoMod: {
      noNoWords: new Array(),
      fastMsg: false,
      massMention: false,
      largeMessage: false,
      allCaps: false,
      invites: false,
      spoilers: false,
      duplicateText: false,
      allLinks: false,
      imageSpam: false,
      selfbotDetect: false,
      mentionCount: 5,
      autoMuteTime: 10000,
      maxEmote: 6,
      maxChars: 1800,
    },
  };
};
