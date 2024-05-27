module.exports = {
  name: 'sticker',
  description: 'Joue au jeu des emoji',
  execute(message, args) {
    // Check if user provided an argument
    if (!args.length) {
      // User did not provide an argument, throw an error
      return message.reply('you must provide a custom emoji from the server.');
    }

    // Search for the emoji in the cache
    const emoji = message.guild.emojis.cache.find(
      emoji => emoji.name === args[0]
    );

    // If the emoji was not found, throw an error
    if (!emoji) {
      return message.reply('invalid custom emoji from the server.');
    }

    // Use the emoji in a message
    message.channel.send(`You have selected the ${emoji} emoji.`);
  }
}
