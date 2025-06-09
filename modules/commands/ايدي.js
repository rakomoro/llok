const axios = require('axios');
const fs = require('fs-extra');
const path = require('path');

module.exports.config = {
  name: "ايدي",
  version: "1.0",
  hasPermssion: 0,
  credits: "راكو سان",
  description: "عرض معلومات عن المستخدم",
  commandCategory: "آۆآمـر عـآمـةّ",
  usages: ".معلوماتي",
  cooldowns: 5
};

module.exports.run = async function({ api, event }) {
  try {
    const userID = event.senderID;
    const userInfo = await api.getUserInfo(userID);
    const user = userInfo[userID];
    const avatarURL = `https://graph.facebook.com/${userID}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`;
    const imgPath = path.join(__dirname, 'tmp', `${userID}.jpg`);
    fs.ensureDirSync(path.dirname(imgPath));
    const response = await axios.get(avatarURL, { responseType: 'arraybuffer' });
    fs.writeFileSync(imgPath, Buffer.from(response.data, 'binary'));
    const gender = user.gender === 2 ? 'ذكر' : user.gender === 1 ? 'أنثى' : user.gender === 0 ? 'مخصص' : 'غير معروف'; 
    const msg = `✵───── ⋆⋅☆⋅⋆ ─────✵\n اسمك: ${user.name}\nايدي حسابك: ${userID}\nجنسك: ${gender}\nعدد رسائلك: ${user.messageCount || 'غير معروف'} \n✵───── ⋆⋅☆⋅⋆ ─────✵`;
    api.sendMessage({ body: msg, attachment: fs.createReadStream(imgPath) }, event.threadID, () => fs.unlinkSync(imgPath));
  } catch {
    api.sendMessage("حدث خطأ أثناء تنفيذ الأمر", event.threadID);
  }
};
