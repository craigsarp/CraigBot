module.exports = {
  name: 'setwelcome',
  description: 'Set Welcome Channel Command',
  usage: 'Used to set the welcome channel.',
  execute(message, args, Discord, db) {
  let channel = message.mentions.channels.first() //mentioned channel
    
    if(!channel) { //if channel is not mentioned
      return message.channel.send("Please Mention the channel first")
    }
    
    //Now we gonna use quick.db
    
    db.set(`welchannel_${message.guild.id}`, channel.id) //set id in var
    
    message.channel.send(`Welcome Channel set to ${channel}`) //send success message
  }
}