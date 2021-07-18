const prefixSchema = require('./models/prefix.js');
module.exports = {
    name: 'help',
    description: 'Help Command',
    usage: 'Used to help the dumb.',
    run: async(message, args, Discord, fs, config) => {
        let prefix;
        const data = await prefixSchema.findOne({
            GuildID: message.guild.id
        });
        let prefix;
        if (data) {
            prefix = data.Prefix;

        } else if (!data) {
            //set the default prefix here
            prefix = config.default_prefix;

        }
        const data = [];
        const {
            commands
        } = message.client;

        if (!args.length) {
            const helpEmbed = new Discord.MessageEmbed()
                .setTitle('Here\'s a list of all my commands:')
                .setDescription(commands.map(command => command.name).join(', '))
                .setFooter(`\nYou can send ${prefix}help [command name] to get info on a specific command!`)
                .setColor("RANDOM")

            return message.channel.send(helpEmbed);
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
