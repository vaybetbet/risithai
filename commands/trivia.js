const fs = require('fs');

module.exports = {
  name: 'trivia',
  description: 'trivia game',
  execute(message) {
    const trivia = async () => {
      try {
        const data = await fs.promises.readFile('./assets/json/trivia.json');
        const questions = JSON.parse(data);

        // Select a random question from the array
        const randomIndex = Math.floor(Math.random() * questions.length);
        const question = questions[randomIndex].question;

        // Send the question to the channel
        const reply = await message.channel.send(question);

        // Await the user's response
        const filter = response => {
          return response.author.id === message.author.id && (response.content.toLowerCase() === 'oui' || response.content.toLowerCase() === 'non');
        };
        const collected = await message.channel.awaitMessages(filter, { max: 1, time: 10000, errors: ['time'] });

        // Check if the user's response is correct
        const userAnswer = collected.first().content.toLowerCase();
        const correctAnswer = questions[randomIndex].answer;
        const responsesData = await fs.promises.readFile('./assets/json/responses.json');
        const responses = JSON.parse(responsesData);
        if (userAnswer === correctAnswer) {
            const randomResponse = responses.correctResponses[Math.floor(Math.random() * responses.correctResponses.length)];
            reply.edit(`${randomResponse} <:moine:863135186387992677>`);
          } else {
            const randomResponse = responses.incorrectResponses[Math.floor(Math.random() * responses.incorrectResponses.length)];
            reply.edit(`${randomResponse} <:mahi:934838231722262628>`);
          }
      } catch (error) {
        console.error(error);
        message.channel.send('Une erreur s\'est produite.');
      }
    };

    trivia();
  }
};
