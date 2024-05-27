const axios = require('axios');
const Discord = require('discord.js');

function formatNumberWithSpaces(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

module.exports = {
    name: 'eur',
    aliases: ['euro'],
    description: 'currency conversion EURTHB',
    async execute(message, args) {
        if (!args[0] || isNaN(Number(args[0]))) {
            message.channel.send(`Ce n'est pas un nombre valide!`);
            return;
        }

        try {
            const EURTHBResponse = await axios.get(`https://query1.finance.yahoo.com/v8/finance/chart/EURTHB=X`);
            const EURUSDResponse = await axios.get(`https://query1.finance.yahoo.com/v8/finance/chart/EURUSD=X`);
            
            const EURTHB = EURTHBResponse.data.chart.result[0].meta.regularMarketPrice;
            const EURUSD = EURUSDResponse.data.chart.result[0].meta.regularMarketPrice;

            const amountEUR = Number(args[0]);
            const formattedAmountEUR = formatNumberWithSpaces(amountEUR);
            const resultTHB = formatNumberWithSpaces((amountEUR * EURTHB).toFixed(2));
            const resultUSD = formatNumberWithSpaces((amountEUR * EURUSD).toFixed(2));

            // Create a Discord embed
            const embed = new Discord.MessageEmbed()
                .setColor('#0000FF') // Thai flag yellow
                .addField(':euro: EUR', formattedAmountEUR, false)
                .addField(':flag_th: THB', resultTHB, false)
                .addField(':dollar: USD', resultUSD, false)
                .setTimestamp();

            message.channel.send(embed);
        } catch (error) {
            console.error(error);
            message.channel.send('Une erreur s\'est produite lors de la conversion.');
        }
    }
};
