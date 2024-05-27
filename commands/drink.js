module.exports={
    name: 'drink',
    description: 'drinking game',
    execute(message, args) {
        if (message.mentions.users.size < 2) {
          message.reply('Il faut mentionner au moins 2 membres pour jouer khey. <:perplexe:863368527061712927>').then(replyMessage => {
            setTimeout(() => {
              replyMessage.delete();
              message.delete();
            }, 5000);
          });
          return;
        }
        
        const mentionedMembers = message.mentions.members.array();
        const mentionedSet = new Set(mentionedMembers);
        
        if (mentionedSet.size !== mentionedMembers.length) {
          message.reply('Each member can only be mentioned once.').then(replyMessage => {
            setTimeout(() => {
              replyMessage.delete();
              message.delete();
            }, 5000);
          });
          return;
        }
        
        const randomMember = mentionedMembers[Math.floor(Math.random() * mentionedMembers.length)];
        
        message.channel.send(`${randomMember} has been selected!`);
        
        // Rest of the code for the game goes here...
      }
      
}