const moment = require('moment-timezone');

module.exports = {
    config: {
        name: "ابتايم",
        credit: "Z I N O",
        description: "عرض وقت تشغيل",
        commandCategory: "آۆآمـر آلُـمطُـۆر",
        cooldowns: 5
    },
    run: async ({ api, event }) => {
        const uptime = process.uptime();
        const uptimeHours = Math.floor(uptime / (60 * 60));
        const uptimeMinutes = Math.floor((uptime % (60 * 60)) / 60);
        const uptimeSeconds = Math.floor(uptime % 60);

        const replyMsg = `⏱️ Bot uptime: ${uptimeHours.toString().padStart(2, '0')}:${uptimeMinutes.toString().padStart(2, '0')}:${uptimeSeconds.toString().padStart(2, '0')}`;

        api.sendMessage(replyMsg, event.threadID, event.messageID);
    }
};
