
const fs = require('fs');

module.exports = {
    name: 'sky',
    description: 'Photo sky',
    execute(message) {
        let urls = [
            "https://cdn.discordapp.com/attachments/970659758400995438/970661775131410452/sky1.jpg",
            "https://cdn.discordapp.com/attachments/970659758400995438/970661775450185748/sky2.jpg",
            "https://cdn.discordapp.com/attachments/970659758400995438/970661775701839919/sky3.jpg",
            "https://cdn.discordapp.com/attachments/970659758400995438/970661776041598976/sky4.jpg"
        ];
        let pic_url = urls[Math.floor(Math.random() * urls.length)];
        message.channel.send({ files: [{ attachment: pic_url }] });
    }
}

