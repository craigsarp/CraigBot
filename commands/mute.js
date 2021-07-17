module.exports = {
    name: 'mute',
    description: 'Mute Command',
    usage: 'Used to mute the annoying.',
    execute(message, args, Discord, ms) {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply('No no no.')
        const target = message.mentions.users.first();

        if (!args[1] === null || message.mentions.members.first()){
          if (isNaN(ms(args[1]))) {
          return message.reply('Please type a valid time.')
        }
        }
        if (target) {

            let mutedRole = message.guild.roles.cache.find(role => role.name === 'muted');
            let memberTarget = message.guild.members.cache.get(target.id);

            if (!args[1]) {
                memberTarget.roles.add(mutedRole.id);

                const muteSuccess = new Discord.MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('Muted Successfully!')
                    .setDescription(`<@${memberTarget.user.id}> has been muted 🤫`);



                message.channel.send(muteSuccess);

                const muteSuccessDM = new Discord.MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('Muted!')
                    .setDescription(`You have been muted forever 🤫`)
                    .setFooter(`Moderator : @${message.author.tag}`)
                    .setTimestamp();
                memberTarget.send(muteSuccessDM);
                return;
            }
            
            memberTarget.roles.add(mutedRole.id);
            const muteSuccessTimer = new Discord.MessageEmbed()
                .setColor('RANDOM')
                .setTitle('Muted Successfully!')
                .setDescription(`<@${memberTarget.user.id}> has been muted for ${ms(ms(args[1]))} 🤫`);
            message.channel.send(muteSuccessTimer);

            const muteSuccessDMTimer = new Discord.MessageEmbed()
                .setColor('RANDOM')
                .setTitle('Muted!')
                .setDescription(`You have been muted for ${ms(ms(args[1]))} 🤫`)
                .setFooter(`Moderator : @${message.author.tag}`)
                .setTimestamp();;
            memberTarget.send(muteSuccessDMTimer);

            
            setTimeout(function() {
                memberTarget.roles.remove(mutedRole.id);
            }, ms(args[1]));

        } else {
            message.channel.send('Cant find that member!');
        }

    }
}