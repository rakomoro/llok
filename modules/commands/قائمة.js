module.exports.config = {
  name: "قائمة",
  version: '1.0.0',
  credits: 'عمر',
  hasPermssion: 2,
  description: 'قائمة المجموعات التي تمت اضافة البوت فيها بواسطة مستخدم غير المطور',
  commandCategory: "آۆآمـر آلُـمطُـۆر",
  usages: 'قائمة المجموعات',
  cooldowns: 15
};

module.exports.handleReply = async function({ api, event, args, handleReply, Threads }) {
  if (event.senderID != "61553754531086") {
    api.sendMessage("لا يمكنك استخدام هذا الأمر", event.threadID, event.messageID);
    return;
  }
  var arg = event.body.split(" ");
  var idgr = handleReply.groupid[arg[1] - 1];
  if (arg[0] == "غادر") {
    api.sendMessage("أمر من البوت مغادرة المجموعة", idgr);
    api.removeUserFromGroup(`${api.getCurrentUserID()}`, idgr);
    api.sendMessage("تم المغادرة بنجاح: " + idgr, event.threadID, event.messageID);
  } else if (arg[0] == "وافق") {
    api.sendMessage("تم الموافقة على المجموعة", idgr);
    api.sendMessage("تم الموافقة على المجموعة: " + idgr, event.threadID, event.messageID);
  } else if (arg[0] == "حظر") {
    const data = (await Threads.getData(idgr)).data || {};
    data.banned = 1;
    await Threads.setData(idgr, { data });
    global.data.threadBanned.set(parseInt(idgr), 1);
    api.sendMessage("تم حظر المجموعة", idgr);
    api.sendMessage("تم حظر المجموعة: " + idgr, event.threadID, event.messageID);
  } else if (arg[0] == "الغاء حظر") {
    const data = (await Threads.getData(idgr)).data || {};
    data.banned = 0;
    await Threads.setData(idgr, { data });
    global.data.threadBanned.delete(parseInt(idgr));
    api.sendMessage("تم إلغاء حظر المجموعة", idgr);
    api.sendMessage("تم إلغاء حظر المجموعة: " + idgr, event.threadID, event.messageID);
  }
};

module.exports.run = async function({ api, event, client, Threads }) {
  if (event.senderID != "61553754531086") {
    api.sendMessage("لا يمكنك استخدام هذا الأمر", event.threadID, event.messageID);
    return;
  }
  var list = await api.getThreadList(100, null, ['INBOX']);
  var listthread = [];
  for (var groupInfo of list) {
    if (groupInfo.isGroup && groupInfo.adminIDs.some(admin => admin.id != "61553754531086")) {
      listthread.push({
        id: groupInfo.threadID,
        name: groupInfo.name
      });
    }
  }
  let msg = '', i = 1;
  var groupid = [];
  for (var group of listthread) {
    msg += `${i++}. ${group.name}\nالمعرف: ${group.id}\n\n`;
    groupid.push(group.id);
  }
  if (listthread.length == 0) {
    api.sendMessage("لا توجد مجموعات تمت اضافة البوت فيها بواسطة مستخدم غير المطور", event.threadID, event.messageID);
  } else {
    api.sendMessage(msg + 'رد بـ "غادر" أو "وافق" أو "حظر" أو "الغاء حظر" رقم الطلب للمغادرة أو الموافقة أو حظر أو إلغاء حظر هذه المجموعة!!', event.threadID, (e, data) => global.client.handleReply.push({
      name: this.config.name,
      author: event.senderID,
      messageID: data.messageID,
      groupid,
      type: 'reply'
    }));
  }
};
