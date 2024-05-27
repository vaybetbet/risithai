
const fs = require('fs');

module.exports = {
    name: 'boomrang',
    description: 'Pavé Boomrang',
    execute(message) {
        const redpill = async () => {
            fs.readFile('./assets/json/redpill.json', async (err, data) => {
                if (err) throw err;
                let chaineJSON = JSON.parse(data);
                message.channel.send(chaineJSON.data[Math.floor(Math.random() * chaineJSON.data.length)].redpill)
        })}

        redpill();
    }
}

