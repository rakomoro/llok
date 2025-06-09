const axios = require("axios");
const moment = require("moment-timezone");

module.exports.config = {
  name: "بادئة",
  version: "2.0.0",
  hasPermission: 0,
  credits: "Z I N O",
  description: "prefix bot",
  commandCategory: "آۆآمـر عـآمـةّ",
  usages: "[]",
  cooldowns: 0
};

module.exports.handleEvent = async function ({ api, event, client }) {
  const { threadID, body } = event;
  if (!body) return;

  const { PREFIX } = global.config;
  const gio = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss || DD/MM/YYYY");

  let threadSetting = global.data.threadData.get(threadID) || {};
  let prefix = threadSetting.PREFIX || PREFIX;

  const lowerBody = body.toLowerCase();

  if (
    lowerBody === "prefix" ||
    lowerBody === "prefix bot là gì" ||
    lowerBody === "quên prefix r" ||
    lowerBody === "dùng sao"
  ) {
    api.sendMessage(
      `✏️ رمز البوت : ${prefix}\n📎 P
    رمز المجموعه: ${PREFIX}`,
      threadID,
      event.messageID
    );
  }
};

module.exports.run = async function () {};
