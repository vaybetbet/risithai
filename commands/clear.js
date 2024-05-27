module.exports={
    name: 'clear',
    description: 'Clears messages.',
    async execute(message, number){

        if(!message.member.roles.cache.has('870316036233261146')) return message.reply("tu ne peux pas faire ça khey."); //check if l'user à le rôle bot

        if(!number[0]) number === 1; //ça fait pas ce que je veux faire, j'aimerais que si c'est juste !clear sans arg eh bien nombre = 1
        if(isNaN(number[0])) number = 1; //ça ça check si c'est un int si j'ai bien compris
        if(number[0] > 99) return message.reply("pas plus de 100 messages khey.");
        if(number[0] < 1) number === 1; //et ça si c'est en dessous de 1

        //la commande est super basique, si c'est !clear beh nombre = 1 et sinon l'int spécifié, c'est tout, mais je me suis un peu perdu dans les checks lol

        await message.channel.messages.fetch({limit: ++number[0]}).then(messages=>{
                message.channel.bulkDelete(messages);
    });
}
}