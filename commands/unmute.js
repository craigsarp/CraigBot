module.exports = {
    name: 'unmute',
    description: 'Unmute Command',
    usage: 'Used to unmute people.',
    execute(message, args, Discord) {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply('You cannot use this command!')
        const target = message.mentions.users.first();
        if (target) {
            let mutedRole = message.guild.roles.cache.find(role => role.name === 'muted');

            let memberTarget = message.guild.members.cache.get(target.id);

            memberTarget.roles.remove(mutedRole.id);
            const unMuteSuccess = new Discord.MessageEmbed()
                .setColor('RANDOM')
                .setTitle('Unmuted Successfully!')
                .setDescription(`<@${memberTarget.user.id}> has been unmuted`);



            message.channel.send(unMuteSuccess);

            const unMuteSuccessDM = new Discord.MessageEmbed()
                .setColor('RANDOM')
                .setTitle('Unmuted!')
                .setDescription(`You have been unmuted`)
                .setFooter(`Moderator : @${message.author.tag}`)
                .setTimestamp();
            memberTarget.send(unMuteSuccessDM);
            return;
        } else {
            message.channel.send('Cant find that member!');
        }
    }
}
