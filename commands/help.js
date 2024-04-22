// commands/help.js

module.exports = {
    name: 'help',
    description: 'Shows list of available commands.',
    execute(message, args) {
        const { prefix } = require('../config.json');
        const data = [];
        const { commands } = message.client;

        if (!args.length) {
            data.push('Here\'s a list of all my commands:');
            data.push(commands.map(command => command.name).join(', '));
            data.push(`\nYou can send \`${prefix}help [command name]\` to get info on a specific command!`);
            data.push(`\nTo configure welcome and leave messages, use \`${prefix}set\`.`);
            data.push('\nUse `!set` to configure the following options:');
            data.push('• `thumbnail` - Set thumbnail for welcome and leave messages. Value should be a valid URL or attachment.');
            data.push('• `message` - Set welcome or leave message. Value should be text for the message.');
            data.push('• `title` - Set title for the welcome or leave message. Value should be text for the title.');
            data.push('• `channel` - Set channel for welcome and leave messages. Value should be a valid channel mention or ID.');
            data.push('\nUse `!preview` to preview the welcome and leave messages based on your settings.');

            return message.author.send(data, { split: true })
                .then(() => {
                    if (message.channel.type === 'dm') return;
                    message.reply('I\'ve sent you a DM with all my commands!');
                })
                .catch(error => {
                    console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
                    message.reply('it seems like I can\'t DM you! Do you have DMs disabled?');
                });
        }
        // ...
    },
};
