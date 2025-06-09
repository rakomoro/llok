module.exports.config = {
  name: "رصيد",
  version: "1.0.0",
  hasPermssion: 0,
  credits: " صلاح عمـــــــــكم ԅ(¯﹃¯ԅ) ",
  description: "عرض الرصيد الحالي",
  commandCategory: "آۆآمـر عـآمـةّ",
  cooldowns: 5
};

module.exports.run = async ({ event, api, Currencies }) => {
  const { senderID } = event;
  let data = await Currencies.getData(senderID);
  let money = data.money || 0;
  return api.sendMessage(`رصيدك الحالي هو: ${money}$`, event.threadID, event.messageID);
};
