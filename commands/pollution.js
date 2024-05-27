const axios = require('axios');
const { MessageEmbed } = require('discord.js');

module.exports={
    name: 'pollution',
    description: 'Pollution in bkk',
    async execute(message, args){
        let value_nana = await axios.get(`https://website-api.airvisual.com/v1/stations/7ca92679ed55ef1af384?units.temperature=celsius&units.distance=kilometer&units.pressure=millibar&units.system=metric&AQI=US&language=en-TH`)
        let value_chatuchak = await axios.get(`https://website-api.airvisual.com/v1/stations/576f8f48534a16b5053c?units.temperature=celsius&units.distance=kilometer&units.pressure=millibar&units.system=metric&AQI=US&language=en-TH`)
        let value_on_nut = await axios.get(`https://website-api.airvisual.com/v1/stations/kjBeGhwN3tWF8Lknp?units.temperature=celsius&units.distance=kilometer&units.pressure=millibar&units.system=metric&AQI=US&language=en-TH`)

        AQI_nana = value_nana.data.current.aqi
        AQI_chatuchak = value_chatuchak.data.current.aqi
        AQI_onnut = value_on_nut.data.current.aqi

        // Calculate average AQI
        const averageAQI = Math.round((AQI_nana + AQI_chatuchak + AQI_onnut) / 3);

        // Set embed color based on average AQI
        let embed_colour = 
        averageAQI <= 50 ? "00ff00" :
        averageAQI < 100 ? "ffff00" :
        averageAQI < 150 ? "ff7600" :
        averageAQI < 200 ? "ff0000" :
        "81008f";
      
        const bangkokEmbed = new MessageEmbed()
         
        .setColor(embed_colour)
        .setTitle('Bangkok Pollution')
        .setURL('https://www.iqair.com/us/thailand/bangkok')
        //.setAuthor({ name: '', iconURL: 'https://i.imgur.com/AfFp7pu.png', url: '' })
        //.setDescription('Some description here')
        .setThumbnail('https://i.imgur.com/MHQ1ZvD.png')
        .addFields(
            { name: 'AQI Nana', value: AQI_nana, inline: true},
            { name: 'Main Pollutant', value: value_nana.data.current.mainPollutant, inline: true},
            { name: '\n', value: '\n' },
            { name: 'AQI Chatuchak', value: AQI_chatuchak, inline: true},
            { name: 'Main Pollutant', value: value_chatuchak.data.current.mainPollutant, inline: true},
            { name: '\n', value: '\n' },
            { name: 'AQI On Nut', value: AQI_onnut, inline: true},
            { name: 'Main Pollutant', value: value_on_nut.data.current.mainPollutant, inline: true},
            //{ name: '\u200B', value: '\u200B' },
            //{ name: 'WHOExposure', value: value_nana.data.current.WHOExposure.WHOExposureColor, inline: true },
        )
        //.addFields({ name: 'Inline field title', value: 'Some value here', inline: true })
        //.setImage('https://i.imgur.com/AfFp7pu.png')
        .setTimestamp()
        //.setFooter({ text: 'Some footer text here', iconURL: 'https://i.imgur.com/AfFp7pu.png' });

        message.channel.send(bangkokEmbed);
        console.log(averageAQI)



        /*message.channel.send(`POLUTION A BANGKOK

        AQI nana : ${AQI_nana}
        Main pollutant : ${value_nana.data.current.mainPollutant}
        WHOExposure : ${value_nana.data.current.WHOExposure.WHOExposureColor}

        AQI chatuchak : ${AQI_chatuchak}
        Main pollutant : ${value_chatuchak.data.current.mainPollutant}
        WHOExposure : ${value_chatuchak.data.current.WHOExposure.WHOExposureColor}

        AQI on nut : ${AQI_onnut}
        Main pollutant : ${value_on_nut.data.current.mainPollutant}
        WHOExposure : ${value_on_nut.data.current.WHOExposure.WHOExposureColor}
        
POLUTION A PUKHET
SOON

POLUTION A CHIANG MAI
SOON

POLUTION A PATTAYA
SOON
`) */ 
    }
}
