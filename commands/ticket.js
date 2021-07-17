const {
    DiscordTicket
} = require('discord_ticket_maker')
const ticket = new DiscordTicket()
module.exports = {
    name: 'ticket',
    description: 'Ticket Command',
    usage: 'Used to make a ticket.',
    execute(message, args, Discord) {
        const reason = message.content.slice(7)

        ticket.makeTicket(message, reason, "swfr")
    }
}