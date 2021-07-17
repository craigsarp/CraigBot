module.exports = {
  name: 'addmoney',
  description: 'Add Money Command',
  usage: 'Used by admins to add money to your account (Disabled)',
  execute(message, args, Discord, db) {
  if (!message.member.hasPermission("ADMINISTRATOR"))  {
        return message.channel.send("No no no.");
    }
    if (message.mentions.users.first()) {
      if (!args[0]) return message.reply('Please specify an amount too add.');


    if (isNaN(args[0])) return message.reply('That was not a valid number!');

    let user = message.author.id;

    if (isNaN(message.mentions.users.first())) {
      let user = message.mentions.users.first().id;
    }
    message.channel.send(`Successfully added ${args[0]} to ${user}`);


    db.add(`user_${user}.bal`, args[0])
    }
    
  }
}