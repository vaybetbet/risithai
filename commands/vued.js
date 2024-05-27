module.exports={
    name: 'vued',
    description: 'Vued.',
    execute(message, args){

        console.log(message)

        const member = message.mentions.users.first();

        if(!args[0]){
            message.channel.send(`<@${message.author.id}> s'est fait vued. <:chipo:900348762843668491>`)
        }else if(member){
            const memberTarget = message.guild.members.cache.get(member.id);
            message.channel.send(`${memberTarget} s'est fait VUED par <@${message.author.id}>. <:glutoayoent:938502442281234483>`)
        }else{
            message.channel.send(`<@${message.author.id}> s'est fait VUED. <:glutoayoent:938502442281234483>`)
        }
        
    }
}