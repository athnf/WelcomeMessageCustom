const Discord = require('discord.js');
const fs = require('fs');
const { prefix, token } = require('./config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const defaultSettings = {
    welcomeMessage: "Welcome to the server, {user}!",
    leaveMessage: "Goodbye, {user}!",
    thumbnail: "",
    channel: ""
};

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    if (!client.commands.has(commandName)) return;

    const command = client.commands.get(commandName);

    try {
        command.execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('There was an error trying to execute that command!');
    }
});

client.on('guildMemberAdd', member => {
    const welcomeSettings = loadSettings(member.guild.id, 'welcomeMessage');
    const welcomeMessage = welcomeSettings.replace('{user}', member);

    const thumbnail = loadSettings(member.guild.id, 'thumbnail');

    const channelID = loadSettings(member.guild.id, 'channel');
    const channel = member.guild.channels.cache.get(channelID);

    if (channel && welcomeMessage) {
        channel.send(welcomeMessage, {
            files: [thumbnail]
        });
    }
});

client.on('guildMemberRemove', member => {
    const leaveSettings = loadSettings(member.guild.id, 'leaveMessage');
    const leaveMessage = leaveSettings.replace('{user}', member);

    const thumbnail = loadSettings(member.guild.id, 'thumbnail');

    const channelID = loadSettings(member.guild.id, 'channel');
    const channel = member.guild.channels.cache.get(channelID);

    if (channel && leaveMessage) {
        channel.send(leaveMessage, {
            files: [thumbnail]
        });
    }
});

function loadSettings(guildId, setting) {
    const filePath = `./settings/${guildId}.json`;
    if (fs.existsSync(filePath)) {
        const data = fs.readFileSync(filePath);
        const settings = JSON.parse(data);
        return settings[setting] || defaultSettings[setting];
    } else {
        return defaultSettings[setting];
    }
}

client.login(token);
