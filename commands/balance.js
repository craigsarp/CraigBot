module.exports = {
    name: 'balance',
    description: 'Balance Command',
    usage: 'Used to check how much money you have.',
    execute(message, args, db, Discord, config) {
        let prefix = db.get(`prefix_${message.guild.id}`)
        if (prefix === null) prefix = config.default_prefix;
        if (db.get(`user_${message.author.id}.bal`) === null) {
            message.reply(`The user needs to use \`${prefix}start\``)
        } else {
            let user = message.author.id;
            let bal = db.get(`user_${message.author.id}.bal`)

            const embed = new Discord.MessageEmbed()
                .setTitle(`${message.author.username}\'s Balance`)
                .setDescription(`${bal} :coin:`)
                .setColor("RANDOM")
                .setTimestamp()

            message.channel.send(embed)

        }
    }
}
