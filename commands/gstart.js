  module.exports = {
  name: 'gstart',
  description: 'Gstart Command',
  usage: 'Used to create a giveaway',
  execute(message, args, Discord, client, ms) {
      const { GiveawaysManager } = require('discord-giveaways');
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("You cannot use this command!")

        let channel = message.mentions.channels.first();

        if(!channel) return message.reply("Please Provide a valid channel!\n`Usage: c.gstart #<channel> <duration>D/M/s/ms <num. of winners> <prize>`")

        let giveawayDuration = args[1];

        if(!giveawayDuration || isNaN(ms(giveawayDuration))) return message.reply('Please providwe a valid duration\n`Usage: c.gstart #<channel> <duration>D/M/s/ms <num. of winners> <prize>`')
    
        let giveawayWinners = args[2]

        if(isNaN(giveawayWinners) || (parseInt(giveawayWinners) <= 0)) return message.reply('Please provide a valid number of winners!\n`Usage: c.gstart #<channel> <duration>D/M/s/ms <num. of winners> <prize>`')
    
        let giveawayPrize = args.slice(3).join(" ")

        if(!giveawayPrize) return message.reply('Please specify a valid prize!\n`Usage: c.gstart #<channel> <duration>D/M/s/ms <num. of winners> <prize>`')

        client.giveawaysManager.start(channel, {
            time: ms(giveawayDuration),
            prize: giveawayPrize,
            winnerCount: giveawayWinners,
            hostedBy: bot.config.hostedBy ? message.author : null,

            message: {
                giveaway: (bot.config.everyoneMention ? "@everyone\n\n" : "") + "Giveaway!",
                giveawayEned: (bot.config.everyoneMention ? "@everyone\n\n" : "") + "Giveaway Ended..",
                timeRemaining: "Time remaining: **{duration}**",
                inviteToParticipate: "React with 🎉 to enter!",
                winMessage: "Congrats {winners}, you won {prize}",
                embedFooter: "Giveaway Time!",
                noWinner: "Couldnt determine a winner",
                hostedBy: "Hosted by {user}",
                winners: "winner(s)",
                endedAt: "Ends at",
                units: {
                    seconds: "seconds",
                    minutes: "minutes",
                    hours: "hours",
                    days: "days",
                    pluralS: false
                }
            }
        })

        message.channel.send(`Giveaway Starting in ${channel}`)
  }
}
