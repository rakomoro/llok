const axios = require('axios');
 UPoLPrefix = [
  'أسترا',
  'نازي',
  'Astra',
  'naze'
];

module.exports = {
  config: {
    name: 'أسترا',
    aliases: ["Ai","أسترا"],
    version: '1.2.1',
    role: 0,
    commandCategory: 'آۆآمـر عـآمـةّ', 
    author: '𝙸𝙷𝙰𝙱',
    shortDescription: '',
    longDescription: '',
  },

  onStart: async function () {},
  onChat: async function ({ message, event, args, api, threadID, messageID }) {

    const ahprefix = UPoLPrefix.find((p) => event.body && event.body.toLowerCase().startsWith(p));
    if (!ahprefix) {
      return;
    }

    const upol = event.body.substring(ahprefix.length).trim();
    if (!upol) {
      await message.reply('🤖 𝗔𝘀𝘁𝗿𝗮 𝗔𝗜\n━━━━━━━━━━━━━\nمرحباً أنا نموذج Ai وأدعى أسترا ، تم تطويري عن طريق صلاح لأجل الإجابة عن مختلف الأسئلة بما أساعدك اليوم 🤍');
      return;
    }

    const apply = ['🌝 أحتاج ربما مساعدتك', 'كيف يمكنني مساعدتك؟🌝', 'ماذا تحتاج اليوم؟🌝', 'هل لديك سؤال؟'];
    const randomapply = apply[Math.floor(Math.random() * apply.length)];

    if (args[0] === 'هاي' || args[0] === 'هلا' || args[0] === 'سلام') {
      message.reply(`${randomapply}`);
      return;
    }

    const encodedPrompt = encodeURIComponent(args.join(" "));

    await message.reply('جاري التفكير... 💭');

    const response = await axios.get(`https://sandipbaruwal.onrender.com/gemini?prompt= ${encodedPrompt}`);

    const UPoL = response.data.answer;

    const upolres = `🤖 𝗔𝘀𝘁𝗿𝗮 𝗔𝗜\n━━━━━━━━━━━━━\n${UPoL}`;

    message.reply(upolres);
  }
};
