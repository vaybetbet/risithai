const axios = require('axios');
const Discord = require('discord.js');

function formatNumberWithSpaces(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

module.exports = {
    name: 'thb',
    description: 'currency conversion THBEUR',
    async execute(message, args) {
        if (!args[0] || isNaN(Number(args[0]))) {
            message.channel.send(`Ce n'est pas un nombre valide!`);
            return;
        }

        try {
            const THBEURResponse = await axios.get(`https://query1.finance.yahoo.com/v8/finance/chart/THBEUR=X`);
            const THBUSDResponse = await axios.get(`https://query1.finance.yahoo.com/v8/finance/chart/THBUSD=X`);
            
            const THBEUR = THBEURResponse.data.chart.result[0].meta.regularMarketPrice;
            const THBUSD = THBUSDResponse.data.chart.result[0].meta.regularMarketPrice;

            const amountTHB = Number(args[0]);
            const formattedAmountTHB = formatNumberWithSpaces(amountTHB);
            const resultEUR = formatNumberWithSpaces((amountTHB * THBEUR).toFixed(2));
            const resultUSD = formatNumberWithSpaces((amountTHB * THBUSD).toFixed(2));

            // Create a Discord embed
            const embed = new Discord.MessageEmbed()
                .setColor('#8B0000') // Thai flag yellow
                .addField(':flag_th: THB', formattedAmountTHB, false)
                .addField(':euro: EUR', resultEUR, false)
                .addField(':dollar: USD', resultUSD, false)
                .setTimestamp();

            message.channel.send(embed);
        } catch (error) {
            console.error(error);
            message.channel.send('Une erreur s\'est produite lors de la conversion.');
        }
    }
}
