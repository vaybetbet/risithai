module.exports={
    name: 'paz',
    description: 'Paz les clefs.',
    execute(message, args){

        const member = message.mentions.users.first();

        if(!args[0]){
            message.channel.send(`PAZ sur toi khey!`)
            message.channel.send(`<:paz:900159091589152849>`)
        }else if(member){
            const memberTarget = message.guild.members.cache.get(member.id);
            message.channel.send(`PAZ sur ${memberTarget}!`)
            message.channel.send(`<:paz:900159091589152849>`)
        }else{
            message.channel.send(`PAZ sur toi khey!`)
            message.channel.send(`<:paz:900159091589152849>`)
        }
        
    }
}