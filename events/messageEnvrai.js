// export the object so it can be required
module.exports = {
  // we want a message event
  event: "message",
  // we want it to trigger multiple times
  once: false,
  // the actual function
  run(message) {
    if (message.content.includes("en vrai")) {
      message.channel.send("En vrai. <:mleh:1100410095852077146>").then((sentMessage) => {
        setTimeout(() => {
          sentMessage.delete();
        }, 2000); // Delete after 2 seconds (2000 milliseconds)
      });
    }
  },
};
