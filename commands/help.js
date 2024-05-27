module.exports={
    name: 'help',
    description: 'Envoie un embed avec les commandes.',
    execute(message, args, Discord){
        const helpMessage = new Discord.MessageEmbed()
        .setColor('#b00904')
        .setTitle('Les commandes les kheys')
        //.setURL('https://discord.js.org/')
        //.setAuthor('Some name', 'https://i.imgur.com/wSTFkRM.png', 'https://discord.js.org')
        //.setDescription('Some description here')
        //.setThumbnail('https://i.imgur.com/wSTFkRM.png')
        .addFields(
            { name: 'Khey', value: 'paz\nsah\ntaps\nuntaps\nlb\nentracte'},
            { name: 'Fun', value: 'roll\nquestion\nroulette'},
            { name: 'Autre', value: 'ping\nprison'},
            //{ name: '\u200B', value: '\u200B' },
            //{ name: 'Inline field title', value: 'Some value here', inline: true },
        )
        //.addField('Inline field title', 'Some value here', true)
        //.setImage('https://i.imgur.com/wSTFkRM.png')
        //.setTimestamp()
        //.setFooter('Some footer text here', 'https://i.imgur.com/wSTFkRM.png');

    message.channel.send(helpMessage);
    }
}