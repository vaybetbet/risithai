module.exports={
    name: 'expat',
    description: 'Expat un mongol',
    execute(message, args){
        const member = message.mentions.users.first();

        if(!message.member.roles.cache.has('870316036233261146')) return message.reply("tu ne peux pas faire ça khey.");

        if(member){
            const memberTarget = message.guild.members.cache.get(member.id);
            memberTarget.roles.add("863125534532042772");
            message.channel.send(`${memberTarget} est un expat en Thaïlande! Bravo khey.`)
            message.channel.send(`<:paspret:907711888215932988>`)

            memberTarget.roles.remove("871514834431254528") //Prison
            memberTarget.roles.remove("866391730983010304") //DejaAlle
            memberTarget.roles.remove("866406826689691648") //Gris
            memberTarget.roles.remove("863125806083866624") //Voyage

        }else{
            message.channel.send('Qui est expat khey?')
        }
    }
}