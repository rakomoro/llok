module.exports.config = {
  name: "joinNoti",
  eventType: ["log:subscribe"],
  version: "1.0.3",
  credits: "Mirai Team",
  description: "Thông báo bot hoặc người vào nhóm",
  dependencies: {
    "fs-extra": "",
    "axios": ""
  }
};

module.exports.run = async function({ api, event, Users }) {
  try {
    const { threadID } = event;
    if (event.logMessageData.addedParticipants.some(i => i.userFbId == api.getCurrentUserID())) {
      api.changeNickname(`[ ${global.config.PREFIX} ] • ${(!global.config.BOTNAME) ? "تم الاتصال بنجاح" : global.config.BOTNAME}`, threadID, api.getCurrentUserID());
      return api.sendMessage(` مرحباً بكم في بوت الدردشة الخاص بأنمي سانين ! 😊`, threadID);
    } else {
      let { threadName, participantIDs } = await api.getThreadInfo(threadID);
      const threadData = global.data.threadData.get(parseInt(threadID)) || {};
      var mentions = [], nameArray = [], memLength = [], i = 0;
      for (id in event.logMessageData.addedParticipants) {
        const userName = event.logMessageData.addedParticipants[id].fullName;
        nameArray.push(userName);
        mentions.push({ tag: userName, id });
        memLength.push(participantIDs.length - i++);
        if (!global.data.allUserID.includes(id)) {
          await Users.createData(id, { name: userName, data: {} });
          global.data.allUserID.push(id);
        }
      }
      memLength.sort((a, b) => a - b);
      (typeof threadData.customJoin == "undefined") ? msg = "مرحباً {name} 👋\nنرحب بكم في {threadName}.\n{type} هو العضو رقم {soThanhVien} في المجموعة 🎉" : msg = threadData.customJoin;
      msg = msg
        .replace(/\{name}/g, nameArray.join(', '))
        .replace(/\{type}/g, (memLength.length > 1) ? 'الأعضاء' : 'العضو')
        .replace(/\{soThanhVien}/g, memLength.join(', '))
        .replace(/\{threadName}/g, threadName);
      const attachments = [];
      for (const id of Object.keys(event.logMessageData.addedParticipants)) {
        const url = `https://graph.facebook.com/${id}/picture?width=200&height=200&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`;
        attachments.push(await global.getStreamFromURL(url));
      }
      const formPush = { body: msg, mentions, attachment: attachments };
      return api.sendMessage(formPush, threadID);
    }
  } catch (error) {
    console.error(error);
  }
                             }
