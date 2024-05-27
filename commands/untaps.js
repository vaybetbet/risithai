module.exports={
    name: 'untaps',
    description: 'Indique la un-validation du taps.',
    execute(message, args){

        verbList = ['désactive','rétrograde','retire','neutralise','enlève','annule','élimine','se débarasse de','s\'exonère de']
        randomChoice = verbList[Math.floor(Math.random() * verbList.length)];
        message.channel.send(`<@${message.author.id}> ${randomChoice} son taps.`)
        message.channel.send(`<:malaisent:879713307387363379>`)
    

    }
}