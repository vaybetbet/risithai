module.exports={
    name: 'blackpink',
    description: 'blinks',
    execute(message, args){
        const member = message.mentions.users.first();

        if(member){
            const memberTarget = message.guild.members.cache.get(member.id);
            memberTarget.roles.add("1069838255442362388");
            message.channel.send(`${memberTarget} est un BLINKS! Blackpink in your area!`)
        }else{
            message.channel.send('Qui sera le prochain BLINKS?')
        }
    }
}