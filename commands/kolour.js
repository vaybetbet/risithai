module.exports = {
  name: 'kolour',
  description: 'Countdown until August 19, 2023 1 PM',
  execute(message, args) {
    const targetDate = new Date('August 19, 2023 13:00:00');
    const currentDate = new Date();

    // Adjust the current date and time to Bangkok time zone (UTC+7)
    const timezoneOffset = -420; // Bangkok is UTC+7 (7 * 60 = 420 minutes)
    currentDate.setMinutes(currentDate.getMinutes() + currentDate.getTimezoneOffset() - timezoneOffset);

    const remainingTime = targetDate.getTime() - currentDate.getTime();

    if (remainingTime < 0) {
      message.channel.send('KOLOURED !!!! <:chateclatax:1125005571721003028>');
      return;
    }

    const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
    const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));

      message.channel.send(`Kolour débutera dans : ${days} jours, ${hours} heures et ${minutes} minutes ! <:chateclatax:1125005571721003028>`);
    },
  };