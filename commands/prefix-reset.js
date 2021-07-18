module.exports = {
    name: 'prefix-reset',
    description: 'Prefix Reset Command',
    usage: 'Used to reset the prefix on your server.',
    run : async(client, message, args, prefixSchema) => {
               await prefixSchema.findOneAndDelete({ Guild : message.guild.id })
               message.channel.send(`The prefix has been reset to ?`)
    }
}
