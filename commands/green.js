module.exports={
    name: 'green',
    description: 'Green un mongol',
    execute(message, args){
        const member = message.mentions.users.first();

        if(!message.member.roles.cache.has('870316036233261146')) return message.reply("tu ne peux pas faire ça khey.");

        if(member){
            const memberTarget = message.guild.members.cache.get(member.id);
            memberTarget.roles.add("863125806083866624");
            message.channel.send(`${memberTarget} est en voyage. Enjoy!`)
            message.channel.send(`<:moine:863135186387992677>`)

            memberTarget.roles.remove("863125534532042772") //Expat
            memberTarget.roles.remove("871514834431254528") //Prison
            memberTarget.roles.remove("866391730983010304") //DejaAlle
            memberTarget.roles.remove("866406826689691648") //Gris

        }else{
            message.channel.send('Je green qui khey?')
        }
    }
}