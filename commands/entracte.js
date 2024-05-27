// module.exports={
//     name: 'entracte',
//     description: 'Envoie un bon truc aux kheys.',
//     execute(message, args){
//         // message.channel.send(`Bientôt les kheys. <:ahi:863381601052524546>`)
//         message.channel.send(`Bientôt les kheys. <:ahi:863381601052524546>`, {
//             file: "https://media.giphy.com/media/CZpro4AZHs436/giphy.gif"
//         });
//     }
// }


module.exports = {
    name: 'entracte',
    description: 'Envoie un bon truc aux kheys.',

    async execute(message, args) {

        let url = new Array();
        let messageValue = new Array();

        let channel = await message.guild.channels.cache.get("870792885207961611");
        await channel.messages.fetch({ limit: 100 }).then(messages => {
            messages.forEach(result => messageValue.push(result))
          })

    
        messageValue.forEach(messages => {
            if (messages.attachments.size > 0) {
                if(attachIsImage(messages));
                    url.push(messages.attachments.array()[0].url)
            }
        });

        let rand = Math.floor(Math.random() * url.length)
        console.log(url);

        message.channel.send("Test", {files: url});
    }
}


function attachIsImage(msgAttach) {
    var url = msgAttach.url;
    //True if this url is a png image.
    return url.indexOf("png", url.length - "png".length /*or 3*/) !== -1;
}

// module.exports = {
//     name: 'entracte',
//     description: 'Envoie un bon truc aux kheys.',

//     async execute(message, args) {

//         let url = new Array();
//         let user = new Array();
//         let messageValue = new Array();

//         let channel = await message.guild.channels.cache.get("870792885207961611");
//         await channel.messages.fetch({ limit: 100 }).then(messages => {
//             messages.forEach(result => messageValue.push(result))
//           })

    
//         messageValue.forEach(messages => {
//             if (messages.attachments.size > 0) {
//                 if(attachIsImage(messages)){
//                     console.log(messages.attachments.array()[0].url);
//                     url.push(messages.attachments.array()[0].url)
//                     user.push(messages.author[User].username)
//                 }
//             }
//         });

//         console.log(url.length);
//         let rand = Math.floor(Math.random() * url.length)
//         console.log(rand)
//         console.log(url);
//         console.log(user);

//         message.channel.send("Cette entracte vous est proposé par" + user, {files: url[rand]});
//     }
// }


// function attachIsImage(msgAttach) {
//     var url = msgAttach.url;
//     //True if this url is a png image.
//     return url.indexOf("png", url.length - "png".length /*or 3*/) !== -1;
// }