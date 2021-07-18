module.exports = {
    name: 'help',
    description: 'Help Command',
    usage: 'Used to help the dumb.',
    execute(message, args, Discord, fs, db, config) {
        const data = [];
        const {
            commands
        } = message.client;

        if (!args.length) {
            data.push('Here\'s a list of all my commands:');
            data.push(commands.map(command => command.name).join(', '));
            data.push(`\nYou can send \`help [command name]\` to get info on a specific command!`);

            return message.author.send(data, {
                    split: true
                })
                .then(() => {
                    if (message.channel.type === 'dm') return;
                    let embed = new Discord.MessageEmbed()
                        .setColor('#33FFFF')
                        .setDescription(`I\'ve sent you a DM with all my commands ${message.author}!`)
                        .setFooter('Bot Dev: craigsunday#0001')
                        .setTimestamp(new Date(), )
                        .setThumbnail(`${message.author.displayAvatarURL({ dynamic: true })}`)
                    message.channel.send({
                        embed
                    });
                })
                .catch(error => {
                    console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
                    message.reply('it seems like I can\'t DM you!');
                });
        }

        const name = args[0].toLowerCase();
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

        if (!command) {
            return message.reply('that\'s not a valid command!');
        }

        data.push(`**Name:** ${prefix}${command.name}`);

        if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
        if (command.usage) data.push(`**Usage:** ${command.usage}`);

        message.channel.send(data, {
            split: true
        });
    }
}
