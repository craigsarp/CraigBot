module.exports = {
    name: 'balance',
    description: 'Balance Command',
    usage: 'Used to check how much money you have.',
    run: async (message, args, db, Discord, config) => {
    const { MessageEmbed } = require('discord.js');
 
    const member = message.mentions.members.first() || message.member;
 
    const user = await mongoCurrency.findUser(member.id, message.guild.id); // Get the user from the database.
 
    const embed = new MessageEmbed()
    .setTitle(`${member.user.username}'s Balance`)
    .setDescription(`Wallet: ${user.coinsInWallet}
    Bank: ${user.coinsInBank}/${user.bankSpace}
    Total: ${user.coinsInBank + user.coinsInWallet}`);
    
    message.channel.send(embed);

     }
}
