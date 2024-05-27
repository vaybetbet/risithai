module.exports={
    name: 'question',
    description: 'Demande au bot une question.',
    execute(message, args){
        
        if(!args[0]) return message.reply("quelle est ta question khey ?");

        question = args.join(" ");
        choices = ["Non","Oui","Peut être","Probablement","Probablement pas"]
        randomChoice = choices[Math.floor(Math.random() * choices.length)];
        message.channel.send(`**Question**: ${question}\n**Réponse**: ${randomChoice}.`)
    }
}