module.exports={
    name: 'grayed',
    description: 'Grayed un mongol',
    execute(message, args){
        const member = message.mentions.users.first();

        if(!message.member.roles.cache.has('870316036233261146')) return message.reply("tu ne peux pas faire ça khey.");

        if(member){
            const memberTarget = message.guild.members.cache.get(member.id);
            memberTarget.roles.add("866406826689691648");
            message.channel.send(`${memberTarget} est gris.`)
            message.channel.send(`<:chien:900169601218932787>`)

            memberTarget.roles.remove("863125534532042772") //Expat
            memberTarget.roles.remove("871514834431254528") //Prison
            memberTarget.roles.remove("863125806083866624") //Voyage
            memberTarget.roles.remove("866391730983010304") //DejaAlle

        }else{
            message.channel.send('Je gray qui khey?')
        }
    }
}