module.exports={
    name: 'toxique',
    description: 'toxique',
    execute(message, args){
        const member = message.mentions.users.first();

        if(member){
            const memberTarget = message.guild.members.cache.get(member.id);
            memberTarget.roles.add("1069845830275702794");
            message.channel.send(`${memberTarget} est toxique. A éviter.`)
            message.channel.send(`<:quoi:983636053443371038>`)
        }else{
            message.channel.send('Qui est toxique khey?')
        }
    }
}