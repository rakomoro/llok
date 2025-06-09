module.exports.config = {
  name: "تعديل",
  version: "1.0",
  hasPermssion: 2,
  credits: "مطور البوت",
  description: "تعديل أمر",
  commandCategory: "آۆآمـر آلُـمطُـۆر",
  usages: ".تعديل <اسم الأمر>.js <كود الأمر>",
  cooldowns: 5
};

module.exports.run = async function({ api, event, args }) {
  if (!args[0]) return api.sendMessage("يرجى إدخال اسم الأمر", event.threadID);
  const fileName = args[0];
  const filePath = __dirname + "/" + fileName;
  const newCode = args.slice(1).join(" ");
  const fs = require("fs");
  if (!fs.existsSync(filePath)) return api.sendMessage("الأمر غير موجود", event.threadID);
  fs.writeFileSync(filePath, newCode);
  api.sendMessage(`تم تعديل الأمر ${fileName} بنجاح`, event.threadID);
};
