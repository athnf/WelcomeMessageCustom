// commands/utils.js

const fs = require('fs');

function loadSettings(guildId, setting) {
    const filePath = `./settings/${guildId}.json`;
    if (fs.existsSync(filePath)) {
        const data = fs.readFileSync(filePath);
        const settings = JSON.parse(data);
        return settings[setting] || '';
    } else {
        return '';
    }
}

module.exports = {
    loadSettings
};
