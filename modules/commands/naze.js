const axios = require('axios');
const fs = require('fs');
const replies = require('./replies.json');

module.exports = {
  config: {
    name: "نازي",
    version: "1.0",
    hasPermssion: 0,
    credits: "Rako San ",
    description: "شات بوت",
    commandCategory: "آۆآمـر عـآمـةّ",
    usages: "",
    cooldowns: 5
  },
  run: async function({ api, event, args }) {
    const msg = args.join(" ");
    let reply = "";
    for (const key in replies.replies) {
      if (msg.includes(key)) {
        reply = replies.replies[key][Math.floor(Math.random() * replies.replies[key].length)];
        break;
      }
    }
    if (!reply) {
      const words = msg.split(" ");
      for (const word of words) {
        for (const key in replies.replies) {
          if (key.includes(word) || word.includes(key)) {
            reply = replies.replies[key][Math.floor(Math.random() * replies.replies[key].length)];
            break;
          }
        }
        if (reply) break;
      }
    }
    if (!reply) reply = "لم أفهم قصدك 🙂💔";
    return api.sendMessage(reply, event.threadID);
  }
};
