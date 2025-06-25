const axios = require('axios');

module.exports = {
  config: {
    name: "نايزي",
    version: "1.0",
    hasPermssion: 0,
    credits: "Rako San",
    description: "محادثة مع AI",
    commandCategory: "آۆآمـر عـآمـةّ",
    usages: "[text]",
    cooldowns: 5
  },
  run: async function({ api, event, args }) {
    const text = args.join(" ");
    const message = event.message;

    try {
      let imageUrl;
      if (message.attachments && message.attachments.length > 0 && message.attachments[0].type === "photo") {
        imageUrl = message.attachments[0].url;
      }

      const apiUrl = `https://rapido.zetsu.xyz/api/gemini?chat=${encodeURIComponent(text)}&uid=${event.senderID}${imageUrl ? `&imageUrl=${encodeURIComponent(imageUrl)}` : ''}`;
      const res = await axios.get(apiUrl);
      const response = res.data.response;

      return api.sendMessage(response, event.threadID);
    } catch (e) {
      return api.sendMessage("حدث خطأ أثناء المحادثة", event.threadID);
    }
  }
};
