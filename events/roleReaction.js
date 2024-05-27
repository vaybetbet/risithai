const discord = require("discord.js");

module.exports = {
  event: "message",
  once: false,
  run: async (message) => {
    if (message.content === "createrolevillemessage") {
      // Checking if the message author is a bot.
      if (message.author.bot) return false;

      // Getting the roles by ID.
      const Role1 = message.guild.roles.cache.get("977004203325141063"); // Bangkok
      const Role2 = message.guild.roles.cache.get("1108838619814305873"); // Phuket
      const Role3 = message.guild.roles.cache.get("1108838727226245181"); // Pattaya
      const Role4 = message.guild.roles.cache.get("1108838796386127883"); // Chiang mai

      // Creating a filter.
      const Filter = (reaction, user) => user.id == message.author.id;

      // Creating the embed message.
      const Embed = new discord.MessageEmbed().setDescription("Choose a role:")
        .addField("🏙️", Role1.name)
        .addField("🏝️", Role2.name)
        .addField("🎡", Role3.name)
        .addField("⛰️", Role4.name);

      // Awaiting for the embed message to be sent.
      const reactionMessage = await message.channel.send(Embed);

      // Reacting to the embed message.
      await reactionMessage.react("🏙️");
      await reactionMessage.react("🏝️");
      await reactionMessage.react("🎡");
      await reactionMessage.react("⛰️");

      // Awaiting reactions to the embed message.
      reactionMessage
        .awaitReactions(Filter, { max: 4, errors: ["time"] })
        .then((collected) => {
          // Storing the selected roles in an array.
          const selectedRoles = [];

          // Iterating through the collected reactions.
          collected.forEach((reaction) => {
            // Getting the role based on the emoji name.
            let role;
            switch (reaction.emoji.name) {
              case "🏙️":
                role = Role1;
                break;
              case "🏝️":
                role = Role2;
                break;
              case "🎡":
                role = Role3;
                break;
              case "⛰️":
                role = Role4;
                break;
            }

            // Adding the role to the array.
            if (role) {
              selectedRoles.push(role);
            }
          });

          // Adding the selected roles.
          if (selectedRoles.length > 0) {
            message.member.roles.add(selectedRoles).then(() => {
              console.log("Roles added!");
            });
          }
        })
        .catch((error) => {
          console.log("An error occurred:", error);
        });
    }
  },
};
