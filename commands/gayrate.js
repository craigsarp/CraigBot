module.exports = {
  name: 'gayrate',
  description: 'Gay Rate Command',
  usage: 'Used to rate of much the player is gay.',
  execute(message, args, Discord) {
    let member = message.mentions.users.first() || message.author

        let rng = Math.floor(Math.random() * 101);

        const howgayembed = new Discord.MessageEmbed()
        .setTitle(`Gay Machine Calculator`)
        .setDescription(`${member.username} is ` + rng + "% Gay🌈")
        .setColor("GREEN")

        message.channel.send(howgayembed);
  }
}
