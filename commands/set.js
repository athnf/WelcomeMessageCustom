// commands/set.js

module.exports = {
    name: 'set',
    description: 'Configure welcome and leave messages.',
    usage: '<setting> <value>',
    execute(message, args) {
        const setting = args[0];
        const value = args.slice(1).join(' ');

        if (!setting || !value) {
            return message.reply("Usage: !set [setting] [value]\nAvailable settings: thumbnail, message, title, channel");
        }

        if (setting === 'thumbnail' || setting === 'message' || setting === 'title' || setting === 'channel') {
            let settingExplanation = "";
            let valueExplanation = "";

            if (setting === 'thumbnail') {
                settingExplanation = "Set thumbnail for welcome and leave messages. Value should be a valid URL or attachment.";
                valueExplanation = "A valid URL or attachment.";
            } else if (setting === 'message') {
                settingExplanation = "Set welcome or leave message.";
                valueExplanation = "Text for the message.";
            } else if (setting === 'title') {
                settingExplanation = "Set title for the welcome or leave message.";
                valueExplanation = "Text for the title.";
            } else if (setting === 'channel') {
                settingExplanation = "Set channel for welcome and leave messages.";
                valueExplanation = "A valid channel mention or ID.";
            }

            return message.channel.send(`Setting ${setting} updated to: ${value}\n\n${settingExplanation}\nValue should be: ${valueExplanation}`);
        } else {
            return message.reply("Invalid setting! Available settings: thumbnail, message, title, channel");
        }
    },
};
