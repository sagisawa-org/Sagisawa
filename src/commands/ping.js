module.exports = class extends require("../structures/command") {
  constructor() {
    super({ name: "ping", whisper: true });
  }

  run({ client }) {
    return { content: `My ping is ${client.ws.ping}ms.` };
  }
};
