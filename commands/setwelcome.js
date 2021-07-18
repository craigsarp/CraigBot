module.exports = {
  name: 'setwelcome',
  description: 'Set Welcome Channel Command',
  usage: 'Used to set the welcome channel.',
  run: async (client, message, args, welcomeSchema) => {
  let channel = message.mentions.channels.first() //mentioned channel
    
   if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("You cannot use this command!");

        const channel = message.mentions.channels.first();
        if(!channel) return message.reply("Please specify a channel you would like to be your welcome channel!");

        welcomeSchema.findOne({ guildId: message.guild.id }, async (err, data) => {
            if (data){
                data.channelId = channel.id;
                data.save();
            } else {
                new welcomeSchema({
                    guildId: message.guild.id,
                    channelId: channel.id,
                }).save();
            }
            message.reply(`New welcome channel is now set as: ${channel}!`);
        })
  }
}
