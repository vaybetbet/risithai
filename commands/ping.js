module.exports={
    name: 'ping',
    description: 'Pings the user.',
    execute(message, args){
        const user = message.author;
        message.channel.send(`Salut khey ${user.username}!`)
    }
}