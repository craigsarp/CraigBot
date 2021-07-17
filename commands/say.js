module.exports = {
  name: 'say',
  description: 'Say Command',
  usage: 'Used to make the bot say something.',
  execute(message, args, Discord) {
        const SayMessage = message.content.slice(4).trim();
        let prefix = db.get(`prefix_${message.guild.id}`)
        if (prefix === null) prefix = config.default_prefix;
        if (SayMessage.includes(prefix)) {
          message.reply("Nice Try Loser");
        }
        message.channel.send("**" + SayMessage + "**");
        message.channel.send("- " + `**${message.author}**`);
  }
}
