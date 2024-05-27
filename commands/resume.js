const axios = require('axios');
const MODEL = "gpt-4o";
const CHANNEL_BOT = "1082266939331719188";

module.exports={
    name: 'resume',
    description: 'Make a short brief of a conversation',
    async execute(message, args, client){
        try {

            // grab response id
            let startid = null, endid = message.id;
            try { startid = message.reference.messageID; }catch (ex) { console.error(ex);  }
            if(startid === null) return;

            // get list messages containing the startid
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
                if(index > 10000) { return; }
            }
            allMessages = allMessages.sort((a, b) => a.createdTimestamp - b.createdTimestamp);
            let realConvListDiscord = allMessages;


            // build conv in string for gpt
            let _username = _original.member.displayName || _original.author.username;
            let convString = `${_username}: ${_original.content}\n`;
            for(let i=0;i<realConvListDiscord.length;i++) {
                if(realConvListDiscord[i].member.displayName === "Le Khey") continue;
                if(realConvListDiscord[i].content.startsWith("<:") && realConvListDiscord[i].content.endsWith(">")) continue;
                if(realConvListDiscord[i].content.startsWith("!")) continue;

                // remove emoji
                let _msg = realConvListDiscord[i].content.replace(/<:.*?>/g, '');
                _username = realConvListDiscord[i].member.displayName || realConvListDiscord[i].author.username;
                convString += `${_username}: ${_msg}\n`;
            }

            console.log(convString);
            if(convString.length > 4096) {
                message.channel.send("Trop de messages khey, je suis pas ton esclave.");
                return;
            }

            // ask gpt
            let gptcontent = `Voici la conversation entre des membres : \n ${convString}. \n\n Ma requete : Dit moi en quelques lignes, ce que les membres veulent exprimer. Dit moi ce que chaque membre cherche à exprimer sous forme de bullet point. Et s'il y a un débat, dit qui a raison (si pas de débat, pas la peine de le mentionner dans ta reponse).`;
            console.log(gptcontent);
            let gptmsg = [{ role: "user", content: gptcontent}];
            const options = {temperature: 0.8, max_tokens: 4000};
            const openai = axios.create({
                baseURL: "https://api.openai.com/v1",
                headers: {"Content-Type": "application/json","Authorization": `Bearer ${process.env.API_KEY_GPT}`},
            });
            const gptreq = async (messages, options = {}) => {
                try {
                    const response = await openai.post("/chat/completions", {
                        model: MODEL,
                        messages,
                        ...options,
                    });

                    return response.data.choices;
                } catch (error) { console.error("Error creating chat completion:", error); }
            }
            const choices = await gptreq(gptmsg, options);
            console.log(choices[0].message.content);

            // send to channel bot
            _username = message.member.displayName || message.author.username;
            let finalresponse = `Recap demandé par ${_username} : ${choices[0].message.content}`;
            const channelbot = await client.channels.fetch(CHANNEL_BOT);
            await channelbot.send(finalresponse);
            // message.channel.send(choices[0].message.content);
        }catch (ex) { console.error(ex); }
    }
}