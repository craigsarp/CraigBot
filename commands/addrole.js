module.exports = {
  name: 'addrole',
  description: 'Add Role Command',
  usage: 'Used by admins to add roles to users.',
  execute(message, args, Discord) {
    if (!message.member.hasPermission('ADMINISTRATOR')) return message.reply('No no no.')

    let member = message.mentions.members.first()

    if (!member) return message.reply('Please mention some to add a role too.')

    if (args[1] === null) return message.reply('Please specify a role to add.')
    let role = message.guild.roles.cache.find(role => role.name === args[1])
    
    if (isNaN(role)) return message.reply('Invalid Role.')
    message.channel.send(`${message.mentions.users.first().username} has received the ${args[1]} role.`)

    member.roles.add(role)
  }
}