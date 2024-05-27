module.exports={
    name: 'blued',
    description: 'Blued un mongol',
    execute(message, args){
        const member = message.mentions.users.first();

        if(!message.member.roles.cache.has('870316036233261146')) return message.reply("tu ne peux pas faire ça khey.");


        if(member){
            const memberTarget = message.guild.members.cache.get(member.id);
            memberTarget.roles.add("866391730983010304");
            message.channel.send(`${memberTarget} s'est fait blued.`)
            message.channel.send(`<:sahgent:900173053751877663>`)

            memberTarget.roles.remove("863125534532042772") //Expat
            memberTarget.roles.remove("871514834431254528") //Prison
            memberTarget.roles.remove("863125806083866624") //Voyage
            memberTarget.roles.remove("866406826689691648") //Gris

        }else{
            message.channel.send('Je blued qui khey?')
        }
    }
}