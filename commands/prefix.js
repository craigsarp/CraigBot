const prefixModel = require("../models/prefix.js");
module.exports = {
    name: 'setprefix',
    description: 'Set Prefix Command',
    usage: 'Used to change the prefix on your server.',
    run: async(client, message, args) => {
        if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply("You cannot use this command!");
        const data = await prefixModel.findOne({
            GuildID: message.guild.id
        });

        if (!args[0]) return message.channel.send('You must provide a **new prefix**!');

        if (args[0].length > 5) return message.channel.send('Your new prefix must be under \`5\` characters!')

        if (data) {
            await prefixModel.findOneAndRemove({
                GuildID: message.guild.id
            })

            message.channel.send(`The new prefix is now **\`${args[0]}\`**`);

            let newData = new prefixModel({
                Prefix: args[0],
                GuildID: message.guild.id
            })
            newData.save();
        } else if (!data) {
            message.channel.send(`The new prefix is now **\`${args[0]}\`**`);

            let newData = new prefixModel({
                Prefix: args[0],
                GuildID: message.guild.id
            })
            newData.save();
        }
    }
}
