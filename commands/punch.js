module.exports = {
    name: 'punch',
    description: 'Punch Command',
    usage: 'Used to punch your enemy.',
    execute(message, args, Discord) {
        let loser = message.mentions.users.first();
        if (!loser) message.reply("Please mention someone to punch!");
        else {


            let embed = new Discord.MessageEmbed()
                .setTitle(`You just punched your enemy: @` + message.mentions.users.first().tag + `!`)
                .setImage(`https://c.tenor.com/p3Hgg8D0mFMAAAAM/anime-punch.gif`)
                .setColor("RANDOM")
            message.channel.send(embed)
        }
    }
}
