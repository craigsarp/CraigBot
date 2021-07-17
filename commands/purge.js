module.exports = {
    name: 'purge',
    description: 'Purge Command',
    usage: 'Used to clear stupid messages.',
     async execute(message, args) {
    try {
    if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply('No no no.')
    const amount = Number(args[0], 10);

    const messages = await message.channel.messages.fetch({
      limit: amount + 1
    });

    message.channel.bulkDelete(messages);

    message.channel.send(`${amount} messages were deleted from this channel.`);

    }

    catch(e) { 
      message.channel.send("Something went wrong.. please try again.");
    }

  }
}