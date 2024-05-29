const axios = require('axios');
const MODEL = "gpt-4o";
const CHANNEL_BOT = "1082266939331719188";
const PRIVATES_CHAN = ["870792885207961611", "871515577171198013", "974128913414516756", "1096046302611124385", "1082266939331719188", "922757322760159242", "1152105677821595769", "1112792932441923655", "872478018763911218", "863133660635070514", "922757842430230579", "1096035819556446291"];
const BOT_USERNAME = "Le Khey";
const MSG_ERROR_TOO_MUCH="Trop de messages khey, je suis pas ton esclave.";

// *************************************************************************** //
// ************************* HELPERS ************************* //
// *************************************************************************** //
// ready to copy/past in others files
const gptreq = async (gptcontent, apikey) => {
    const options = {temperature: 0.8, max_tokens: 4000};
    let messages = [{ role: "user", content: gptcontent}];
    const openai = axios.create({baseURL: "https://api.openai.com/v1", headers: {"Content-Type": "application/json","Authorization": `Bearer ${apikey}`} });

    try {
        const response = await openai.post("/chat/completions", {model: MODEL, messages, ...options });
        return response.data.choices[0].message.content;
    } catch (error) { console.error("Error creating chat completion:", error); }

    return "";
}   

const sendResponseToRisithai = async (client, message, txt, chantopost, postInsideCurrentChan = false) => {
    let finalresponse = `Recap demandé par ${message.author} : \n ${txt}`;
    if(postInsideCurrentChan) message.channel.send(finalresponse)
    else {
        const channelbot = await client.channels.fetch(chantopost);
        await channelbot.send(finalresponse);
    }

    // message.channel.send(finalresponse);
}

const getUsernameFromMessage = (message) => { return message.member.displayName || message.author.username }

// *************************************************************************** //
// ************************* MAIN ************************* //
// *************************************************************************** //
module.exports={
    name: 'resume',
    description: 'Make a short brief of a conversation. Args[0] or response to a message.',
    async execute(message, args, client){
        let postInsideCurrentChan = false;

        // process nb parameter
        let processnb = true, nb = null;
        try {
            nb = parseInt(args[0].trim());
            if(nb <= 0 || nb > 999) processnb = false; 
        }catch (ex) { processnb = false }
        if(typeof nb === 'undefined' || nb === null) processnb = false; 


        // lets go
        try {
            let convString = ``;

            const messageChannelId = message.channel.id;
            if(PRIVATES_CHAN.includes(messageChannelId)) postInsideCurrentChan = true;
            // postInsideCurrentChan = true;

            // grab messages list + sorted
            let realConvListDiscord = [];
            if(processnb) {
                console.log("PROCESS NB " + nb);
                let channel = message.channel;
                let allMessages = [];
                let lastMessageId = message.id;
                let fetchedMessages;
                let indexcrazy = 0;

                while (allMessages.length < nb && indexcrazy < 5000) {
                    indexcrazy++;
                    let limit = Math.min(nb - allMessages.length, 100);
                    fetchedMessages = await channel.messages.fetch({ limit, before: lastMessageId });
                    if (fetchedMessages.size === 0) { break; }
                    allMessages.push(...fetchedMessages.values());
                    lastMessageId = fetchedMessages.last().id;
                }
                if(indexcrazy > 5000) return;

                allMessages = allMessages.sort((a, b) => a.createdTimestamp - b.createdTimestamp);
                realConvListDiscord = allMessages;
                console.log(`recuperation messages processnb ${nb}...ok`);
            } else {
                console.log("PROCESS RESPONSE");

                // grab response id
                let startid = null, endid = message.id;
                try { startid = message.reference.messageID; }catch (ex) { console.error(ex);  }
                if(startid === null) return;

                // get list messages containing the startid
                console.log("recuperation messages...");
                let _original = await message.channel.messages.fetch(startid);
                let allMessages = [];
                let lastMessageId;
                let indexcrazy = 0;

                while (true && indexcrazy < 5000) {
                    indexcrazy++;
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
                    if(indexcrazy > 5000) { message.channel.send(MSG_ERROR_TOO_MUCH); return; }
                }
                if(indexcrazy > 5000) return;

                allMessages = allMessages.sort((a, b) => a.createdTimestamp - b.createdTimestamp);
                realConvListDiscord = allMessages;
                console.log("recuperation messages fron response...ok");
                convString = `${getUsernameFromMessage(_original)}: ${_original.content}\n`;
            }


            // looping conv / make gpt request step by step if too long / or just stack
            let allGPTResponses = [];
            for(let i=0;i<realConvListDiscord.length;i++) {
                if(realConvListDiscord[i].member.displayName === BOT_USERNAME) continue;
                if(realConvListDiscord[i].content.startsWith("<:") && realConvListDiscord[i].content.endsWith(">")) continue;
                if(realConvListDiscord[i].content.startsWith("!")) continue;

                let _msg = realConvListDiscord[i].content.replace(/<:.*?>/g, '');
                let _toadd = `${getUsernameFromMessage(realConvListDiscord[i])}: ${_msg}\n`;
                let _tmp = convString + _toadd;
                if(_tmp.length <= 3500) convString += _toadd;
                else {
                    let gptcontent = `Voici la conversation entre des membres : \n ${convString}. \n\n Ma requete : Dit moi en 3 très courtes lignes, ce que les membres veulent exprimer sous forme de bullet point pour chaque (3 maximum pour chaque). Et s'il y a un débat, dit qui a raison (si pas de débat, pas la peine de le mentionner dans ta reponse).`;
                    let txt = await gptreq(gptcontent, process.env.API_KEY_GPT);
                    allGPTResponses.push(txt);
                    convString = _toadd;
                }
            }

            // 1 conv only, ask gpt and return
            if(allGPTResponses.length === 0) {
                let gptcontent = `Voici la conversation entre des membres : \n ${convString}. \n\n Ma requete : Dit moi en quelques lignes le plus concis possible, ce que les membres veulent exprimer sous forme de bullet point pour chaque (3 maximum pour chaque).  Et s'il y a un débat, dit qui a raison (si pas de débat, pas la peine de le mentionner dans ta reponse).`;
                let txt = await gptreq(gptcontent, process.env.API_KEY_GPT);
                sendResponseToRisithai(client, message, txt, CHANNEL_BOT, postInsideCurrentChan);
            } else { // multiple responses gpt already stored, so we make another request to get unique final response
                let gptcontent = `Voici le résumé d'une conversation des membres : \n ${allGPTResponses.join("\n")}. \n\n Ma requete : Resume moi en quelques lignes, pour chaque membre, ce que les membres ont voulu exprimer. Fait une réponse la plus courte possible. `;
                if(gptcontent.length >= 4000) { message.channel.send(MSG_ERROR_TOO_MUCH); return; }
                let txt = await gptreq(gptcontent, process.env.API_KEY_GPT);
                sendResponseToRisithai(client, message, txt, CHANNEL_BOT, postInsideCurrentChan);
            }
        }catch (ex) { console.error(ex); }
    }
}
