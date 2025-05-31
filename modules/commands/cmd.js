
module.exports.config = {
    name: "أمر",
    version: "1.0.0",
    hasPermssion: 2,
    credits: "Mirai Team",
    description: "إدارة/التحكم في جميع وحدات البوت",
    commandCategory: "آۆآمـر آلُـمطُـۆر",
    usages: "[تحميل/إلغاء تحميل/تحميل الكل/إلغاء تحميل الكل/معلومات] [اسم الوحدة]",
    cooldowns: 5,
    prefix: false
};

const loadCommand = function ({ moduleList, threadID, messageID }) {
    const { writeFileSync } = require('fs-extra');
    const { mainPath, api } = global.client;
    const logger = require(mainPath + '/utils/log');
    const errorList = [];
    delete require.cache[require.resolve(process.cwd()+'/config.json')];
    const configValue = require(process.cwd()+'/config.json');

    for (const nameModule of moduleList) {
        if (!nameModule) {
            errorList.push('- اسم الوحدة فارغ');
            continue;
        }

        try {
            const dirModule = __dirname + '/' + nameModule + '.js';
            delete require.cache[require.resolve(dirModule)];
            const command = require(dirModule);
            global.client.commands.delete(nameModule);

            if (!command.config || !command.run || !command.config.commandCategory) 
                throw new Error('الوحدة ليست بالتنسيق الصحيح!');

            global.client['eventRegistered'] = global.client['eventRegistered'].filter(info => info !== command.config.name);
            
            if (command.config.envConfig && typeof command.config.envConfig === 'object') {
                for (const [key, value] of Object.entries(command.config.envConfig)) {
                    if (!global.configModule[command.config.name]) 
                        global.configModule[command.config.name] = {};
                    if (!configValue[command.config.name]) 
                        configValue[command.config.name] = {};
                    
                    global.configModule[command.config.name][key] = configValue[command.config.name][key] || value || '';
                    configValue[command.config.name][key] = configValue[command.config.name][key] || value || '';
                }
                logger.loader('تم تحميل إعدادات ' + command.config.name);
            }

            if (command.onLoad) {
                command.onLoad({ configValue });
            }

            if (command.handleEvent) global.client.eventRegistered.push(command.config.name);

            if (global.config.commandDisabled.includes(nameModule + '.js') || configValue.commandDisabled.includes(nameModule + '.js')) {
                configValue.commandDisabled.splice(configValue.commandDisabled.indexOf(nameModule + '.js'), 1);
                global.config.commandDisabled.splice(global.config.commandDisabled.indexOf(nameModule + '.js'), 1);
            }
            
            global.client.commands.set(command.config.name, command);
            logger.loader('تم تحميل الأمر ' + command.config.name + '!');
        } catch (error) {
            errorList.push(`- ${nameModule} السبب: ${error.message} في ${error.stack}`);
        }
    }

    if (errorList.length !== 0) {
        api.sendMessage('الوحدات التي حدثت بها مشاكل أثناء التحميل: ' + errorList.join(' '), threadID, messageID);
    }
    api.sendMessage('تم تحميل ' + (moduleList.length - errorList.length) + ' وحدة', threadID, messageID);
    writeFileSync(process.cwd()+'/config.json', JSON.stringify(configValue, null, 4), 'utf8');
};

const unloadModule = function ({ moduleList, threadID, messageID }) {
    const { writeFileSync } = require("fs-extra");
    const { mainPath, api } = global.client;
    const logger = require(mainPath + "/utils/log").loader;
    delete require.cache[require.resolve(process.cwd()+'/config.json')];
    const configValue = require(process.cwd()+'/config.json');

    for (const nameModule of moduleList) {
        if (!nameModule) {
            continue;
        }

        global.client.commands.delete(nameModule);
        global.client.eventRegistered = global.client.eventRegistered.filter(item => item !== nameModule);
        configValue["commandDisabled"].push(`${nameModule}.js`);
        global.config["commandDisabled"].push(`${nameModule}.js`);
        logger(`تم إلغاء تحميل الأمر ${nameModule}!`);
    }

    writeFileSync(process.cwd()+'/config.json', JSON.stringify(configValue, null, 4), 'utf8');
    return api.sendMessage(`تم إلغاء تحميل ${moduleList.length} وحدة`, threadID, messageID);
};

module.exports.run = function ({ event, args, api }) {
    const { readdirSync } = require("fs-extra");
    const { threadID, messageID } = event;

    const command = args[0];
    const moduleList = args.slice(1).map(module => module.trim()).filter(Boolean);

    switch (command) {
        case "تحميل":
        case "load":
            if (moduleList.length === 0) return api.sendMessage("اسم الوحدة لا يمكن أن يكون فارغاً!", threadID, messageID);
            return loadCommand({ moduleList, threadID, messageID });
        case "إلغاء":
        case "unload":
            if (moduleList.length === 0) return api.sendMessage("اسم الوحدة لا يمكن أن يكون فارغاً!", threadID, messageID);
            return unloadModule({ moduleList, threadID, messageID });
        case "تحميل_الكل":
        case "loadall":
            const loadAllModules = readdirSync(__dirname).filter((file) => file.endsWith(".js") && !file.includes('example'));
            const loadModules = loadAllModules.map(item => item.replace(/\.js/g, ""));
            return loadCommand({ moduleList: loadModules, threadID, messageID });
        case "إلغاء_الكل":
        case "unloadall":
            const unloadAllModules = readdirSync(__dirname).filter((file) => file.endsWith(".js") && !file.includes('example') && !file.includes("command"));
            const unloadModules = unloadAllModules.map(item => item.replace(/\.js/g, ""));
            return unloadModule({ moduleList: unloadModules, threadID, messageID });
        case "معلومات":
        case "info": {
            const commandName = moduleList.join("") || "";
            const commandInfo = global.client.commands.get(commandName);

            if (!commandInfo) return api.sendMessage("الوحدة التي أدخلتها غير موجودة!", threadID, messageID);

            const { name, version, hasPermssion, credits, cooldowns, dependencies } = commandInfo.config;

            return api.sendMessage(
                "=== " + name.toUpperCase() + " ===\n" +
                "- مبرمج بواسطة: " + credits + "\n" +
                "- الإصدار: " + version + "\n" +
                "- الصلاحية المطلوبة: " + ((hasPermssion === 0) ? "مستخدم" : (hasPermssion === 1) ? "مدير مجموعة" : "مشغل البوت") + "\n" +
                "- وقت الانتظار: " + cooldowns + " ثانية\n" +
                `- الحزم المطلوبة: ${(Object.keys(dependencies || {})).join(", ") || "لا يوجد"}`,
                threadID, messageID
            );
        }
        default: {
            return global.utils.throwError(this.config.name, threadID, messageID);
        }
    }
};
