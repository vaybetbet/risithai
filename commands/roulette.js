module.exports={
    name: 'roulette',
    description: 'Choisis un membre au hasard.',
    execute(message, args){
        
        const author = message.author;
        var randomUser = message.guild.members.cache.random();

        if(!args[0]){
            while(randomUser.roles.cache.size == 1){
                var randomUser = message.guild.members.cache.random();
                }
            message.channel.send(`<@${author.id}>, le gagnant de la roulette est **${randomUser.displayName}**!`)
            return
        }else{
            while(randomUser.roles.cache.size == 1){
                var randomUser = message.guild.members.cache.random();
                }
            question = args.join(" ");
            message.channel.send(`<@${author.id}>, le gagnant de **${question}** est **${randomUser.displayName}**!`)
        }


    }
}