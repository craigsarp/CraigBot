module.exports = {
  name: 'meme',
  description: 'Meme Command',
  usage: 'Used to send a random meme to the user.',
  run: async(message, args, Discord) => {
    
      const randomPuppy = require("random-puppy");
      const subReddits = ["dankmeme", "meme", "me_irl"];

      const random  = subReddits[Math.floor(Math.random() * subReddits.length)];


      const img = await randomPuppy(random);

      const embedMeme = new Discord.MessageEmbed()
                    .setColor('RANDOM')
                    .setImage(img)
                    .setTitle(`from /r/${random}`)
                    .setURL(`https://reddit.com/r/${random}`);

    message.channel.send(embedMeme);
  }
}