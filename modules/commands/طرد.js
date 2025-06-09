module.exports.config = {
  name: "طرد",
  version: "1.0.1",
  hasPermission: 1,
  credits: "Mirai Team",
  description: "إزالة المستخدم من المجموعة عن طريق الإشارة إليه",
  commandCategory: "آۆآمـر آدِآريَـةّ",
  usages: "[إشارة]",
  cooldowns: 0,
};

module.exports.languages = {
  "ar": {
    "error": "حدث خطأ، يرجى المحاولة مرة أخرى لاحقًا",
    "needPermission": "يلزم وجود صلاحية إدارة المجموعة\nيرجى الإضافة والمحاولة مرة أخرى!",
    "missingTag": "يجب الإشارة إلى المستخدم الذي تريد إزالته"
  }
};

module.exports.run = async function({ api, event, getText, Threads }) {
  var mention = Object.keys(event.mentions);
  try {
    let dataThread = (await Threads.getData(event.threadID)).threadInfo;
    if (!dataThread.adminIDs.some(item => item.id == api.getCurrentUserID())) return api.sendMessage(getText("needPermission"), event.threadID, event.messageID);
    if (!mention[0]) return api.sendMessage(getText("missingTag"), event.threadID);
    if (dataThread.adminIDs.some(item => item.id == event.senderID)) {
      for (const o in mention) {
        setTimeout(() => {
          api.removeUserFromGroup(mention[o], event.threadID);
        }, 3000);
      }
    }
  } catch {
    return api.sendMessage(getText("error"), event.threadID);
  }
};
