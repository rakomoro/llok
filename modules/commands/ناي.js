module.exports.config = {
    name: "ناي",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Z I N O",
    description: "GPT-LUNA",
    commandCategory: "آۆآمـر عـآمـةّ",
    usages: "[ask]",
    usePrefix: false,
    cooldowns: 2,
};

module.exports.run = async function({ api, event, args }) {
    const axios = require("axios");
    let { messageID, threadID, senderID, body } = event;
    let tid = threadID,
    mid = messageID;
    const content = encodeURIComponent(args.join(" "));
    if (!args[0]) return api.sendMessage("ماذا تريد 🐸؟ ", tid, mid);
    try {
         const res = await axios.get(`https://rapido.zetsu.xyz/api/gemini?chat=${encodeURIComponent(content)} `);

        if (res.data.error) {
            api.sendMessage(`Error: ${res.data.error}`, tid, (error, info) => {
                if (error) {
                    console.error(error);
                }
            }, mid);
        } else {
            if (res.data.isImage && res.data.الرد) {
                try {
                    const imageResponse = await axios.get(res.data.الرد, {
                        responseType: 'stream',
                        timeout: 10000
                    });

                    api.sendMessage({
                        attachment: imageResponse.data
                    }, tid, (error, info) => {
                        if (error) {
                            console.error(error);
                           
                            api.sendMessage(`صورة: ${res.data.الرد}`, tid, mid);
                        }
                    });
                } catch (imageError) {
                    console.error('خطأ في تحميل الصورة:', imageError);

                    api.sendMessage(`صورة: ${res.data.الرد}`, tid, mid);
                }
            } else {
            
                const respond = res.data.response || res.data.الرد || "لا يوجد رد";
                api.sendMessage(respond, tid, (error, info) => {
                    if (error) {
                        console.error(error);
                    }
                }, mid);
            }
        }
    } catch (error) {
        console.error(error);
        api.sendMessage("An error occurred while fetching the data.", tid, mid);
    }
};
