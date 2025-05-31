this.config = {
    name: "ريست",
    version: "1.0.0",
    hasPermssion: 2,
    credits: "Z I N O",
    description: "اعادة تشغيل بوت",
    commandCategory: "آۆآمـر آلُـمطُـۆر",
    cooldowns: 0,
    images: [],
 };
 this.run = ({event, api}) => api.sendMessage("✅", event.threadID, () => process.exit(1), event.messageID)
