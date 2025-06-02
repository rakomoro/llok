module.exports.config = {
  name: "حذف",
  version: "1.0",
  hasPermssion: 2,
  credits: "مطور البوت",
  description: "حذف أمر",
  commandCategory: "آۆآمـر آلُـمطُـۆر",
  usages: ".حذف <اسم الملف>.js",
  cooldowns: 5
};

module.exports.run = async function({ api, event, args }) {
  const ownerID = "61553754531086";
  if (event.senderID !== ownerID) return api.sendMessage("لا يمكنك استخدام هذا الأمر", event.threadID);

  if (!args[0]) return api.sendMessage("يرجى إدخال اسم الملف", event.threadID);
  const fs = require("fs");
  const filePath = __dirname + "/" + args[0];
  if (!fs.existsSync(filePath)) return api.sendMessage("الملف غير موجود", event.threadID);
  fs.unlinkSync(filePath);
  api.sendMessage(`تم حذف الملف ${args[0]} بنجاح`, event.threadID);
};
