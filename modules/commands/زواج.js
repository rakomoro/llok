module.exports.config = {
  name: "زواج",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Rako San",
  description: "تزويج عشوائي بين عضوين من المجموعة",
  commandCategory: "آۆآمـر عـآمـةّ",
  usages: "زوجني",
  cooldowns: 5,
};

module.exports.run = async function({ api, event }) {
  try {
    // الحصول على معلومات الأعضاء
    const threadInfo = await api.getThreadInfo(event.threadID);
    const members = threadInfo.participantIDs.filter(id => id !== api.getCurrentUserID());

    if (members.length < 2)
      return api.sendMessage("❌ يجب أن تحتوي المجموعة على عضوين على الأقل غير البوت!", event.threadID);

    // اختيار شخصين عشوائيًا
    const shuffled = members.sort(() => 0.5 - Math.random());
    const [partner1, partner2] = shuffled;

    const mentions = [
      { tag: "الزوج/ة", id: partner1 },
      { tag: "الزوج/ة", id: partner2 }
    ];

    const message = `💍 تم الزواج بنجاح! 💐\n\n` +
                    `🥰 تم إعلان زواج:\n` +
                    `👤 ${await getName(api, partner1)}\n` +
                    `❤️ مع\n` +
                    `👤 ${await getName(api, partner2)}\n\n` +
                    `نتمنى لكم حياة سعيدة مليئة بالحب 🌹`;

    return api.sendMessage({ body: message, mentions }, event.threadID);
  } catch (error) {
    console.error(error);
    return api.sendMessage("❌ حدث خطأ أثناء تنفيذ الأمر.", event.threadID);
  }
};

// دالة للحصول على اسم العضو
async function getName(api, userID) {
  try {
    const info = await api.getUserInfo(userID);
    return info[userID].name;
  } catch {
    return "مستخدم مجهول";
  }
}
