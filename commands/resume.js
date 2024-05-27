const axios = require('axios');
const MODEL = "gpt-4o";
const CHANNEL_BOT = "1082266939331719188";
const FORBIDDEN_CHAN = ["870792885207961611", "871515577171198013", "974128913414516756", "1096046302611124385", "1082266939331719188", "922757322760159242", "1152105677821595769", "1112792932441923655", "872478018763911218", "863133660635070514", "922757842430230579"];


module.exports={
    name: 'resume',
    description: 'Make a short brief of a conversation',
    async execute(message, args, client){
        try {
            const messageChannelId = message.channel.id;
            if(FORBIDDEN_CHAN.includes(messageChannelId)) {message.channel.send("Tu peux pas faire ca ici mon petit khey"); return; }

            // grab response id
            let startid = null, endid = message.id;
            try { startid = message.reference.messageID; }catch (ex) { console.error(ex);  }
            if(startid === null) return;

            // get list messages containing the startid
            console.log("recuperation messages...");
            let _original = await message.channel.messages.fetch(startid);
            let allMessages = [];
            let lastMessageId;
            let index = 0;
            while (true) {
                index++;
                const options = { limit: 100 };
                if (lastMessageId) { options.before = lastMessageId; }
                const messages = await message.channel.messages.fetch(options);
                if (!messages.size) { break; }
                allMessages = allMessages.concat(Array.from(messages.values()));
                if (messages.has(startid)) {
                    allMessages = allMessages.slice(0, allMessages.findIndex(msg => msg.id === startid) + 1);
                    break;
                }
                lastMessageId = messages.last().id;
                if(index > 5000) { message.channel.send("Trop de messages khey, je suis pas ton esclave."); return; }
            }
            allMessages = allMessages.sort((a, b) => a.createdTimestamp - b.createdTimestamp);
            let realConvListDiscord = allMessages;
            console.log("recuperation messages...ok");


            // build conv in string for gpt
            let _username = _original.member.displayName || _original.author.username;
            let convString = `${_username}: ${_original.content}\n`;

            const gptreq = async (gptcontent) => {
                const options = {temperature: 0.8, max_tokens: 4000};
                let messages = [{ role: "user", content: gptcontent}];
                const openai = axios.create({baseURL: "https://api.openai.com/v1", headers: {"Content-Type": "application/json","Authorization": `Bearer ${process.env.API_KEY_GPT}`} });
                try {
                    const response = await openai.post("/chat/completions", {
                        model: MODEL,
                        messages,
                        ...options,
                    });

                    return response.data.choices[0].message.content;
                } catch (error) { console.error("Error creating chat completion:", error); }
            }   

            let sendResponseToRisithai = async (txt) => {
                let finalresponse = `Recap demandé par ${message.author} : \n ${txt}`;
                // console.log(finalresponse);
                const channelbot = await client.channels.fetch(CHANNEL_BOT);
                await channelbot.send(finalresponse);
                // message.channel.send(finalresponse);
            }

            let allGPTResponses = [];
            for(let i=0;i<realConvListDiscord.length;i++) {
                console.log(i+'/'+realConvListDiscord.length);
                if(realConvListDiscord[i].member.displayName === "Le Khey") continue;
                if(realConvListDiscord[i].content.startsWith("<:") && realConvListDiscord[i].content.endsWith(">")) continue;
                if(realConvListDiscord[i].content.startsWith("!")) continue;

                let _msg = realConvListDiscord[i].content.replace(/<:.*?>/g, '');
                _username = realConvListDiscord[i].member.displayName || realConvListDiscord[i].author.username;
                let _toadd = `${_username}: ${_msg}\n`;
                let _tmp = convString + _toadd;
                if(_tmp.length <= 3500) convString += _toadd;
                else {
                    let gptcontent = `Voici la conversation entre des membres : \n ${convString}. \n\n Ma requete : Dit moi en 3 très courtes lignes, ce que les membres veulent exprimer sous forme de bullet point pour chaque. Et s'il y a un débat, dit qui a raison (si pas de débat, pas la peine de le mentionner dans ta reponse).`;
                    let txt = await gptreq(gptcontent);
                    allGPTResponses.push(txt);
                    convString = _toadd;
                }
            }

            // 1 req only, we return directly the result
            if(allGPTResponses.length === 0) {
                let gptcontent = `Voici la conversation entre des membres : \n ${convString}. \n\n Ma requete : Dit moi en quelques lignes le plus concis possible, ce que les membres veulent exprimer sous forme de bullet point pour chaque.  Et s'il y a un débat, dit qui a raison (si pas de débat, pas la peine de le mentionner dans ta reponse).`;
                let txt = await gptreq(gptcontent);
                sendResponseToRisithai(txt);
            } else { // multiple responses gpt, so we make another request for make it shorter
                let gptcontent = `Voici le résumé d'une conversation des membres : \n ${allGPTResponses.join("\n")}. \n\n Ma requete : Resume moi en quelques lignes, pour chaque membre, ce que les membres ont voulu exprimer. Fait une réponse la plus courte possible. `;
                if(gptcontent.length >= 4000) { message.channel.send("Trop de messages khey, je suis pas ton esclave."); return; }
                let txt = await gptreq(gptcontent);
                sendResponseToRisithai(txt);
            }
        }catch (ex) { console.error(ex); }
    }
}
