module.exports={
    name: 'sah',
    description: 'Sah sur les clefs.',
    execute(message, args){

        const member = message.mentions.users.first();

        if(!args[0]){
            message.channel.send(`SAH!`)
            message.channel.send(`<:sah:871410452758941727>`)
        }else if(member){
            const memberTarget = message.guild.members.cache.get(member.id);
            message.channel.send(`SAH sur ${memberTarget}!`)
            message.channel.send(`<:sah:871410452758941727>`)
        }else{
            message.channel.send(`SAH!`)
            message.channel.send(`<:sah:871410452758941727>`)
        }
        
    }
}