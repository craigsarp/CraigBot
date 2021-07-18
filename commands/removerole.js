module.exports = {
  name: 'removerole',
  description: 'Remove Role Command',
  usage: 'Used by admins to remove roles from users.',
  execute(message, args, Discord) {
    if (!message.member.hasPermission('ADMINISTRATOR')) return message.reply('You cannot use this command!')

    
    let member = message.mentions.members.first()

    if (!member) return message.reply('Please mention some to remove a role from.')

    if (args[1] === null) return message.reply('Please specify a role to remove.')

    let role = message.guild.roles.cache.find(role => role.name === args[1])

    if (isNaN(role)) return message.reply('Invalid Role.')

    message.channel.send(`The ${args[1]} role has been removed from ${message.mentions.users.first().username}.`)

    member.roles.remove(role)
  }
}
