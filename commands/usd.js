const axios = require('axios');
const Discord = require('discord.js');

function formatNumberWithSpaces(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

module.exports = {
    name: 'usd',
    description: 'Currency conversion USD to other currencies',
    async execute(message, args) {
        if (!args[0] || isNaN(Number(args[0]))) {
            message.channel.send(`Not a valid number!`);
            return;
        }

        try {
            const USDTHBResponse = await axios.get(`https://query1.finance.yahoo.com/v8/finance/chart/USDTHB=X`);
            const USDEURResponse = await axios.get(`https://query1.finance.yahoo.com/v8/finance/chart/USDEUR=X`);
            
            const USDTHB = USDTHBResponse.data.chart.result[0].meta.regularMarketPrice;
            const USDEUR = USDEURResponse.data.chart.result[0].meta.regularMarketPrice;

            const amountUSD = Number(args[0]);
            const formattedAmountUSD = formatNumberWithSpaces(amountUSD);
            const resultTHB = formatNumberWithSpaces((amountUSD * USDTHB).toFixed(2));
            const resultEUR = formatNumberWithSpaces((amountUSD * USDEUR).toFixed(2));

            // Create a Discord embed
            const embed = new Discord.MessageEmbed()
                .setColor('#006400') // Blue color
                .addField(':dollar: USD', formattedAmountUSD, false)
                .addField(':flag_th: THB', resultTHB, false)
                .addField(':euro: EUR', resultEUR, false)
                .setTimestamp();

            message.channel.send(embed);
        } catch (error) {
            console.error(error);
            message.channel.send('An error occurred during the conversion.');
        }
    }
};
