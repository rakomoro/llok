const axios = require('axios');

module.exports = {
  config: {
    name: "نازي",
    version: "1.0",
    hasPermssion: 0,
    credits: "Rako San ",
    description: "شات بوت",
    commandCategory: "آۆآمـر عـآمـةّ",
    usages: "",
    cooldowns: 5
  },
  run: async function({ api, event, args }) {
    const msg = args.join(" ");
    let reply = "";

    if (!msg || msg === '') return api.sendMessage("داير شنو يا بل ಠ_ಠ ؟", event.threadID);
    if (msg.includes('من مطورك') || msg.includes('من صنعك')) return api.sendMessage("تم تطويري من قبل صلاح الدين المعروف بي Rako San ", event.threadID);
    if (msg.includes('من أنت')) return api.sendMessage(" أنا ميراي، مصمم من قبل عمك صلاح الدين لمساعدتك في الحصول على المعلومات 🤖.", event.threadID);
    if (msg.includes('مطورك')) return api.sendMessage("مطوري صلاح عمك يا ناعم 🤖", event.threadID);
    if (msg.includes('صلاح الدين') || msg.includes('راكو سان')) return api.sendMessage("عمك وعم الجميع 🤖💖", event.threadID);
    if (msg.includes('اسمك') || msg.includes('اسمك منو')) return api.sendMessage("اسمي ميراي يا دنقلا 🤖", event.threadID);

    try {
      const response = await axios.get(`https;//rapido.zetsu.xyz/api/gemini?chat=${encodeURIComponent(msg)}`);
      reply = response.data.response;

      if (isStupidQuestion(msg)) {
        reply = `اوه يالك من غبي، ${reply} 😒`;
      } else if (isLoveQuestion(msg)) {
        reply = `لا أستطيع أن أضيع وقتي مع شخص مثلك، ${reply} 💔`;
      } else if (isViolentQuestion(msg)) {
        reply = `أنت مجنون؟ لا أستطيع أن أساعدك في هذا، ${reply} 😠`;
      } else {
        reply = `نازي هنا لمساعدتك، ${reply} 🤔`;
      }
    } catch (error) {
      reply = "داير شنو يا ناعم ⟵(๑¯◡¯๑) ";
    }

    return api.sendMessage(reply, event.threadID);
  }
};

function isStupidQuestion(text) {
  const stupidQuestions = ['تاكل', 'تشرب', 'تحب', 'تبوس', 'اضرب', 'هات فلوس'];
  return stupidQuestions.some(question => text.includes(question));
}

function isLoveQuestion(text) {
  const loveQuestions = ['احبك', 'بحبك', 'في حبك'];
  return loveQuestions.some(question => text.includes(question));
}

function isViolentQuestion(text) {
  const violentQuestions = ['اضرب', 'اقتل', 'اهدم'];
  return violentQuestions.some(question => text.includes(question));
      }
