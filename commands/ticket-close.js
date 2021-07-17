const {
    DiscordTicket
} = require('discord_ticket_maker')
const ticket = new DiscordTicket()
module.exports = {
    name: 'close',
    description: 'ticket-close',
    usage: 'Used to close a ticket.',
    execute(message, args, Discord) {
        const channel = message.mentions.channels.first() || message.guild.channels.cache.find(c => c.id == args || c.name == args) || message.channel

        ticket.closeTicket(message, channel)
    }
}