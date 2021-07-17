module.exports = {
    name: 'serverinfo',
    description: 'Server Info Command',
    usage: 'Used to see the info of the server.',
    execute(message, args, Discord) {
        if (!message.member.hasPermission('ADMINISTRATOR')) return message.reply('No no no.')
        const ServerLogo = message.guild.iconURL();
        const ServerInfoEmbed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setTitle("Server Info")
            .setImage(ServerLogo)
            .setDescription(`About **${message.guild}**`)
            .addField("**Date Created**", `Server Created on **${message.guild.createdAt.toLocaleString()}**`)
            .addField("**Owner**", `The Owner of This Server is ${message.guild.owner}`)
            .addField("**Member Count**", "This Server Has ` " + `${message.guild.memberCount}` + " ` **Members**")
            .addField("**Emoji Count**", "This Server Has ` " + `${message.guild.emojis.cache.size}` + " ` **Emojis**")
            .addField("**Roles Count**", "This Server Has ` " + `${message.guild.roles.cache.size}` + " ` **Roles**")
            .addField("**Channels Count**", "This Server Has ` " + `${message.guild.channels.cache.size}` + " ` **Channels**")
        message.channel.send(ServerInfoEmbed);
    }
}