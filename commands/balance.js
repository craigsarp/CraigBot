module.exports = {
    name: 'balance',
    description: 'Balance Command',
    usage: 'Used to check how much money you have.',
    run: async(message, args, db, Discord, config, mongoEconomy) => {
        mongoEconomy.connect('mongodb://' + process.env.mongoPath)
        let member = message.mentions.users.first() || message.author;
 
        let user = await mongoEconomy.find(member.id, message.guild.id);
 
        message.channel.send({
            embed: {
                color: `RANDOM`,
             title: `${member.tag}'s Balance`,
             description: `Money: ${user.money}\nBank: ${user.bank}\nTotal: ${user.money + user.bank}`
          }
        })
    }
}
