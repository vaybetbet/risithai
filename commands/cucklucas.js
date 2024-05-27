
const fs = require('fs');

module.exports = {
    name: 'cucklucas',
    description: 'cuckeries',
    execute(message) {
        const cucklucas = async () => {
            fs.readFile('./assets/json/cucklucas.json', async (err, data) => {
                if (err) throw err;
                let chaineJSON = JSON.parse(data);
                message.channel.send(chaineJSON.data[Math.floor(Math.random() * chaineJSON.data.length)].cucklucas)
        })}

        cucklucas();
    }
}

