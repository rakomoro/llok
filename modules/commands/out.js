module.exports.config = {
    name: "خروج",
    version: "1.0.0",
    hasPermssion: 2,
    credits: "عمر",
    description: "مو شغلك 😇",
    commandCategory: "آۆآمـر آلُـمطُـۆر",
    usages: "غادري [ايدي الكروب]",
    cooldowns: 10,
};

module.exports.run = async function({ api, event, args }) {
    const permission =
    [`100088400305450`,`100088400305450`]
    if (!permission.includes(event.senderID)) return api.sendMessage("مش لك", event.threadID, event.messageID);
        if (!args[0]) return api.removeUserFromGroup(api.getCurrentUserID(), event.threadID);
        if (!isNaN(args[0])) return api.removeUserFromGroup(api.getCurrentUserID(), args.join(" "));
                                                                                              }
