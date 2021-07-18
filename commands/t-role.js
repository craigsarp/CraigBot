const {
    DiscordTicket
} = require('discord_ticket_maker')
const ticket = new DiscordTicket()
module.exports = {
    name: 't-role',
    description: 'T-role Command',
    usage: 'Used to change the ticket helper role.',
    execute(message, args, Discord) {
        if (message.member.hasPermission('ADMINISTRATOR')) {
            const role = message.mentions.roles.first()

            ticket.setRole(message, role) //Set the support role, that gets pinged when a new ticket is created!
        } else {
            message.reply("You cannot use this command!")
        }
    }
}
