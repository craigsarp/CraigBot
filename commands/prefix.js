module.exports = {
    name: 'prefix',
    description: 'Prefix Command',
    usage: 'Used to change the prefix on your server.',
    execute(message, args, Discord, db) {
        if (!message.member.hasPermission("ADMINISTRATOR")) {
            return message.channel.send("No no no.");
        }

        if (!args[0]) {
            return message.channel.send("Please give the prefix you want to set");
        }

        if (args[1]) {
            return message.channel.send("You can not send prefix a double argument");
        }

        if (args[0].length > 3) {
            return message.channel.send("You can not send prefix more than 3 characters");
        }

        if (args.join("") === '?') {
            db.delete(`prefix_${message.guild.id}`);
            return message.channel.send("Reseted Prefix ✅");
        }

        db.set(`prefix_${message.guild.id}`, args[0])
        message.channel.send(`Bot Prefix Set To ${args[0]}`);
    }
}
