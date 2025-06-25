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

    try {
      const response = await axios.get(`https://rapido.zetsu.xyz/api/gemini?chat=${encodeURIComponent(msg)}`);
      reply = response.data.response;

      // تعديل الرد من الAPI بشكل قاصف
      if (isStupidQuestion(msg)) {
        reply = `اوه يالك من غبي، ${reply} 😒`;
      } else if (isLoveQuestion(msg)) {
        reply = ` لا أستطيع أن أبادلك المشاعر، أنا بوت فقط + ما تنسى انا 🦅، ${reply} 🐸`;
      } else if (isViolentQuestion(msg)) {
        reply = `أنت مجنون؟ لا أستطيع أن أساعدك في هذا، ${reply} 😠`;
      } else {
        reply = `نازي هنا لمساعدتك، ${reply} 🤔`;
      }
    } catch (error) {
      reply = "داير شنو يا  دنقل ԅ(¯﹃¯ԅ) ";
    }

    return api.sendMessage(reply, event.threadID);
  }
};

// دالة للتحقق من الأسئلة الغبية
function isStupidQuestion(text) {
  const stupidQuestions = ['تاكل', 'تشرب', 'تحب', 'تبوس', 'اضرب', 'هات فلوس'];
  return stupidQuestions.some(question => text.includes(question));
}

// دالة للتحقق من الأسئلة الرومانسية
function isLoveQuestion(text) {
  const loveQuestions = ['احبك', 'بحبك', 'في حبك'];
  return loveQuestions.some(question => text.includes(question));
}

// دالة للتحقق من الأسئلة العنيفة
function isViolentQuestion(text) {
  const violentQuestions = ['اقصف', 'اضرب', 'اقتل', 'اهدم'];
  return violentQuestions.some(question => text.includes(question));
        }
