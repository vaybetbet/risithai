const { MessageEmbed } =require("discord.js")


module.exports={
    name: 'roleclaim',
    description: 'Message pour obtenir des rôles.',
    execute(message, args){

        if(!message.member.roles.cache.has('863128891023687750')) return message.reply("tu ne peux pas faire ça khey.");


        const expatRole = message.guild.roles.cache.get("863125534532042772")
        const voyageRole = message.guild.roles.cache.get("863125806083866624")
        const habitueRole = message.guild.roles.cache.get("866391730983010304")
        const golemRole = message.guild.roles.cache.get("866406826689691648")
    
        const expatEmoji = message.guild.emojis.cache.get("863375023745400864")
        const voyageEmoji = message.guild.emojis.cache.get("863135186387992677")
        const habitueEmoji = message.guild.emojis.cache.get("863136771319267348")
        const golemEmoji = message.guild.emojis.cache.get("874969287394201601")
    
        const embed = new MessageEmbed()
            .setTitle("Auto-Role pour kheys")
            .setDescription('Réagis à un des stickers pour obtenir ton rôle')
            .setColor('#b00904')
            .addField(
                "Les rôles :",
                `
                ${expatEmoji} - ${expatRole.toString()}
                ${voyageEmoji} - ${voyageRole.toString()}
                ${habitueEmoji} - ${habitueRole.toString()}
                ${golemEmoji} - ${golemRole.toString()}
                `
            );
    
            message.channel.send(embed).then(async msg =>{
                await msg.react(expatEmoji);
                await msg.react(voyageEmoji);
                await msg.react(habitueEmoji);
                await msg.react(golemEmoji);
            })

    }
}