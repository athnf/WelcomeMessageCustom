// commands/preview.js

module.exports = {
    name: 'preview',
    description: 'Preview welcome and leave messages.',
    execute(message, args) {
        const Discord = require('discord.js');
        const { loadSettings } = require('./utils');

        const guildId = message.guild.id;
        const welcomeSettings = loadSettings(guildId, 'welcomeMessage');
        const leaveSettings = loadSettings(guildId, 'leaveMessage');
        const thumbnail = loadSettings(guildId, 'thumbnail');
        const title = loadSettings(guildId, 'title');
        const channelID = loadSettings(guildId, 'channel');

        const welcomeMessage = welcomeSettings.replace('{user}', message.author);
        const leaveMessage = leaveSettings.replace('{user}', message.author);

        const channel = message.guild.channels.cache.get(channelID);

        if (!channel) {
            return message.reply('Please set a valid channel first using !set channel.');
        }

        const embed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle(title || 'Welcome!')
            .setDescription(welcomeMessage || 'Welcome to the server!')
            .setFooter('Preview');

        if (thumbnail) {
            embed.setThumbnail(thumbnail);
        }

        channel.send(embed);

        if (leaveMessage) {
            const leaveEmbed = new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setTitle(title || 'Goodbye!')
                .setDescription(leaveMessage || 'Goodbye!')
                .setFooter('Preview');

            if (thumbnail) {
                leaveEmbed.setThumbnail(thumbnail);
            }

            channel.send(leaveEmbed);
        }
    },
};
