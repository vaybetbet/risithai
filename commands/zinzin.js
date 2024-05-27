module.exports={
    name: 'zinzin',
    description: 'Zinzin sur les clefs.',
    execute(message, args){

        const member = message.mentions.users.first();

        if(!args[0]){
            message.channel.send(`<@${message.author.id}> est zinzin. <:ayaoent:907710795352272948>`)
        }else if(member){
            const memberTarget = message.guild.members.cache.get(member.id);
            message.channel.send(`${memberTarget} est complètement zinzin. <:ayaoent:907710795352272948>`)
        }else{
            message.channel.send(`<@${message.author.id}> est zinzin. <:ayaoent:907710795352272948>`)
        }
        
    }
}