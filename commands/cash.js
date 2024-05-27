module.exports={
    name: 'cash',
    description: 'CASH dans le SLIBARD',
    execute(message, args){

        const member = message.mentions.users.first();

        if(!args[0]){
            message.channel.send(`CASH dans le SLIBARD`)
            // message.channel.send(`<:paz:900159091589152849>`)
        }else if(member){
            const memberTarget = message.guild.members.cache.get(member.id);
            message.channel.send(`CASH dans le SLIBARD ${memberTarget}!`)
            // message.channel.send(`<:paz:900159091589152849>`)
        }else{
            message.channel.send(`CASH dans le SLIBARD`)
            // message.channel.send(`<:paz:900159091589152849>`)
        }
        
    }
}