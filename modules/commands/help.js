
const axios = require('axios');

this.config = {
    name: "مساعدة",
    version: "1.1.1",
    hasPermssion: 0,
    credits: "DC-Nam",
    description: "عرض قائمة الأوامر والمعلومات",
    commandCategory: "الدردشة الجماعية",
    usages: "[اسم الأمر/الكل]",
    cooldowns: 5,
    images: [],
};

this.run = async function({ api, event, args }) {
    const { threadID: tid, messageID: mid, senderID: sid } = event;
    var type = !args[0] ? "" : args[0].toLowerCase();
    var msg = "", array = [], i = 0;
    const cmds = global.client.commands;
    const TIDdata = global.data.threadData.get(tid) || {};
    const admin = global.config.ADMINBOT;
    const NameBot = global.config.BOTNAME;
    const version = this.config.version;
    var prefix = TIDdata.PREFIX || global.config.PREFIX;

    if (type == "الكل" || type == "all") {
        for (const cmd of cmds.values()) {
            msg += `${++i}. ${cmd.config.name}\n→ الوصف: ${cmd.config.description}\n────────────────\n`;
        }
        return api.sendMessage(msg, tid, mid);
    }

    if (type) {
        for (const cmd of cmds.values()) {
            array.push(cmd.config.name.toString());
        }
        if (!array.find(n => n == args[0].toLowerCase())) {
            const stringSimilarity = require('string-similarity');
            commandName = args.shift().toLowerCase() || "";
            var allCommandName = [];
            const commandValues = Object.keys(cmds);
            for (const cmd of commandValues) allCommandName.push(cmd);
            const checker = stringSimilarity.findBestMatch(commandName, allCommandName);
            if (checker.bestMatch.rating >= 0.5) command = global.client.commands.get(checker.bestMatch.target);
            msg = `❎ لم يتم العثور على الأمر '${type}' في النظام.\n📝 تم العثور على أمر مشابه '${checker.bestMatch.target}'`;
            return api.sendMessage(msg, tid, mid);
        }
        const cmd = cmds.get(type).config;
        const img = cmd.images;
        let image = [];
        for (let i = 0; i < img.length; i++) {
            const a = img[i];
            const stream = (await axios.get(a, {
                responseType: "stream"
            })).data;
            image.push(stream);
        }
        msg = `[ دليل الاستخدام ]\n─────────────────\n[📜] - اسم الأمر: ${cmd.name}\n[👤] - المؤلف: ${cmd.credits}\n[🌾] - الإصدار: ${cmd.version}\n[🌴] - الصلاحية: ${TextPr(cmd.hasPermssion)}\n[📝] - الوصف: ${cmd.description}\n[🏷️] - المجموعة: ${cmd.commandCategory}\n[🍁] - طريقة الاستخدام: ${cmd.usages}\n[⏳] - وقت الانتظار: ${cmd.cooldowns}ث\n─────────────────\n📌 دليل الاستخدام للمبتدئين`;
        return api.sendMessage({ body: msg, attachment: image }, tid, mid);
    } else {
        CmdCategory();
        array.sort(S("nameModule"));
        for (const cmd of array) {
            msg += `│\n│ ${cmd.cmdCategory.toUpperCase()}\n├────────⭔\n│ إجمالي الأوامر: ${cmd.nameModule.length} أمر\n│ ${cmd.nameModule.join(", ")}\n├────────⭔\n`;
        }
        msg += `📝 إجمالي عدد الأوامر: ${cmds.size} أمر\n👤 إجمالي مديري البوت: ${admin.length}\n→ اسم البوت: ${NameBot}\n🔰 الإصدار: ${version}\n→ المدير: Phạm Minh Đồng\n📎 الرابط: ${global.config.FACEBOOK_ADMIN}\n${prefix}مساعدة + اسم الأمر لعرض التفاصيل\n${prefix}مساعدة + الكل لعرض جميع الأوامر`;
        return api.sendMessage(`╭─────────────⭓\n${msg}`, tid);
    }

    function CmdCategory() {
        for (const cmd of cmds.values()) {
            const {
                commandCategory,
                hasPermssion,
                name: nameModule
            } = cmd.config;
            if (!array.find(i => i.cmdCategory == commandCategory)) {
                array.push({
                    cmdCategory: commandCategory,
                    permission: hasPermssion,
                    nameModule: [nameModule]
                });
            } else {
                const find = array.find(i => i.cmdCategory == commandCategory);
                find.nameModule.push(nameModule);
            }
        }
    }
};

function S(k) {
    return function(a, b) {
        let i = 0;
        if (a[k].length > b[k].length) {
            i = 1;
        } else if (a[k].length < b[k].length) {
            i = -1;
        }
        return i * -1;
    };
}

function TextPr(permission) {
    p = permission;
    return p == 0 ? "عضو" : p == 1 ? "مدير مجموعة" : p == 2 ? "مدير البوت" : "صلاحية كاملة";
}
