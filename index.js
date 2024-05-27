const Discord = require('discord.js');
const { poll } = require('discord.js-poll');
const client = new Discord.Client();
const prefix = ['!'];
const fs = require('fs');
const express = require('express')
const app = express()
const port = 3000;

client.commands = new Discord.Collection();

const welcomeMessage = fs.readFileSync('intromsg.txt', 'utf8');

const COMMANDS_LIST = [];
const COMMANDS_DISABLED = ["drink", "sticker", "resume"];

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
    COMMANDS_LIST.push(command.name);
}

fs.readdir('./events/', (err, files) => { // We use the method readdir to read what is in the events folder
    if (err) return console.error(err); // If there is an error during the process to read all contents of the ./events folder, throw an error in the console
    files.forEach(file => {
        const eventFunction = require(`./events/${file}`); // Here we require the event file of the events folder
        if (eventFunction.disabled) return; // Check if the eventFunction is disabled. If yes return without any error

        const event = eventFunction.event || file.split('.')[0]; // Get the exact name of the event from the eventFunction variable. If it's not given, the code just uses the name of the file as name of the event
        const emitter = (typeof eventFunction.emitter === 'string' ? client[eventFunction.emitter] : eventFunction.emitter) || client; // Here we define our emitter. This is in our case the client (the bot)
        const once = eventFunction.once; // A simple variable which returns if the event should run once

        // Try catch block to throw an error if the code in try{} doesn't work
        try {
            emitter[once ? 'once' : 'on'](event, (...args) => eventFunction.run(...args)); // Run the event using the above defined emitter (client)
        } catch (error) {
            console.error(error.stack); // If there is an error, console log the error stack message
        }
    });
});

client.once('ready', () =>{
    console.log('Khey is online!') ;
});

client.on('guildMemberAdd', member => {
    member.send(welcomeMessage)
      .then(() => console.log(`Sent a welcome message to ${member.user.tag}`))
      .catch(error => console.error(`Failed to send a welcome message to ${member.user.tag}:`, error));
});

client.on('message', async message =>{
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    console.log(command);

    if(COMMANDS_LIST.includes(command) && !COMMANDS_DISABLED.includes(command))  {
        client.commands.get(command).execute(message, args, client);
        console.log("command found");
    }
    else {
        console.log("command not found");
        // message.channel.send(`Cette commande n'existe pas khey. Tu es zinzin? <:maisnooooooon:1042407744772259861>\nUtilise la commande !help pour ne pas te perdre. <:mahi:934838231722262628>\nEn dépit de. <:sah:871410452758941727>   `)
        // .then(msg => {
        //     setTimeout(() => {
        //         msg.delete();
        //     }, 5000); // delete error message after 5 seconds
        // });
        // setTimeout(() => {
        //     message.delete();
        // }, 5000); // delete user's message after 5 seconds
    }
});

const token = process.env.TOKEN; // Remove any whitespace or newline characters
client.login(process.env.TOKEN); 

app.listen(process.env.PORT, () => {
  console.log(`Risithai ready ${process.env.PORT}`)


app.get('/', (req, res) => {
  res.send('Salut khey')
})