module.exports={
    name: 'taps',
    description: 'Indique la validation du taps.',
    execute(message, args){

        if(!args[0]){
            message.channel.send(`<@${message.author.id}> VALIDE LE TAPS !!!`)
            message.channel.send(`<:paz:900159091589152849>`)
        }
        else if(args[0] === "pas"){
            message.channel.send(`<@${message.author.id}> ne valide pas le taps. <:choc:865357063693402132>`)
        }

        else if(args[0] === "blowjob"){
            message.channel.send(`<@${message.author.id}> ne taps pas mais autorise le blowjob nonobstant. <:chien:900169601218932787>`)
        }
        
        else if(args[0] === "omg"){
            message.channel.send(`<@${message.author.id}> SURVALIDE LE TAPS !!! OMG!!`)
            message.channel.send(`<:alertel:863807448565284884><:mais:871409554498416650>`)
        }

        else if (args[0] === "ok"){
            message.channel.send(`<@${message.author.id}> taps tranquillement, sans plus, mais taps quand même. <:coquin:863136771319267348>`)
        }

        else if (args[0] === "fort"){
            message.channel.send(`<@${message.author.id}> TAPS BIEN FORT COMME IL FAUT.`)
            message.channel.send(`<:paz:900159091589152849>`)
        }

        else if (args[0] === "vergogneless"){
            message.channel.send(`<@${message.author.id}> TAPS SANS VERGNONE!!!`)
            message.channel.send(`<:ahi:863381601052524546>`)
        }

        else if(args[0] === "nucléaire"){
            message.channel.send(`ALERTE NUCLEAIRE !!!!!!!!!!!!!!!! <@${message.author.id}> ATOMISE LE TAPS !!!!!!!!!!!!`)
            message.channel.send(`<:alertel:934840046312370216><:alertel:934840046312370216><:alertel:934840046312370216><:alertel:934840046312370216><:alertel:934840046312370216>`)
        }

    }
}