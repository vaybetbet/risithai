module.exports={
    name: 'prison',
    description: 'Envoie un fdp en prison',
    execute(message, args){
        const member = message.mentions.users.first();

        if(!message.member.roles.cache.has('870316036233261146')) return message.reply("tu ne peux pas faire ça khey.");


        if(member){
            const memberTarget = message.guild.members.cache.get(member.id);
            memberTarget.roles.add("871514834431254528");
            message.channel.send(`${memberTarget} finit en prison pour ses actions misérables. SAH.`)
            message.channel.send(`<:sah:871410452758941727>`)

            memberTarget.roles.remove("863125534532042772") //Expat
            memberTarget.roles.remove("866406826689691648") //Gris
            memberTarget.roles.remove("863125806083866624") //Voyage
            memberTarget.roles.remove("866391730983010304") //DejaAlle

        }else{
            message.channel.send('J\'envoie qui en prison khey?')
        }
    }
}