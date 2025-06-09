const fs = require('fs');
const replies = require('./replies.json');

module.exports = {
  config: {
    name: "تعلم",
    version: "1.0",
    hasPermssion: 0,
    credits:  " Rako San",
    description: "تعلم البوت",
    commandCategory: "آۆآمـر آلُـمطُـۆر",
    usages: "",
    cooldowns: 5
  },
  run: async function({ api, event, args }) {
    const ownerID = "61553754531086";
    if (event.senderID !== ownerID) return api.sendMessage("الأمر فقط لمطور البوت", event.threadID);

    const msg = args.join(" ").split("=>");
    if (msg.length != 2) return api.sendMessage("الرجاء استخدام الصيغة الصحيحة: تعلم سؤال => جواب أو تعلم حذف => سؤال", event.threadID);

    const action = msg[0].trim().toLowerCase();
    const question = msg[1].trim();

    if (action === "حذف") {
      if (!replies.replies[question]) return api.sendMessage(`الرد ${question} غير موجود`, event.threadID);
      delete replies.replies[question];
      fs.writeFileSync('./replies.json', JSON.stringify(replies, null, 2));
      return api.sendMessage(`تم حذف الرد ${question} بنجاح`, event.threadID);
    } else {
      const answer = msg[1].trim().split(",");
      if (!replies.replies[msg[0].trim()]) replies.replies[msg[0].trim()] = [];
      for (const ans of answer) {
        replies.replies[msg[0].trim()].push(ans.trim());
      }
      fs.writeFileSync('./replies.json', JSON.stringify(replies, null, 2));
      return api.sendMessage("تم تعلم البوت بنجاح", event.threadID);
    }
  }
};
