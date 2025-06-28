module.exports.config = {
  name: "اشعار",
  version: "0.0.2",
  hasPermssion: 2,
  credits: "صلاح عمـــــــــكم ",
  description: "ارسال رسالة الى جميع المجموعات عن طريق حساب البوت ",
  commandCategory: "آۆآمـر آلُـمطُـۆر",
  usages: "رسالة [الرسالة]",
  cooldowns: 5,
};

module.exports.run = async function({ api, event, args, utils }) {
  const moment = require("moment-timezone");
  const permission = ["100088400305450","61553754531086"]
  if (!permission.includes(event.senderID)) return api.sendMessage("ماعدك صلاحية :>", event.threadID, event.messageID);
  var gio = moment.tz("Asia/Baghdad").format("HH:mm:ss D/MM/YYYY");
  var msg = args.join(" ");

  const threads = await api.getThreadList(100, null, ['INBOX']);
  const groups = threads.filter(thread => thread.threadID !== event.threadID && thread.isGroup);

  groups.forEach(group => {
    api.sendMessage(` ❲❏❳==[ اشعار من المطور  ]==❲❏❳ \nالوقت : ${gio}\n\nالرسالة : ` + msg, group.threadID);
  });

  return api.sendMessage(`تم إرسال الرسالة إلى ${groups.length} مجموعة بنجاح`, event.threadID, event.messageID);
}
