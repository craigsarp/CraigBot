module.exports = {
    name: 'prefix-reset',
    description: 'Prefix Reset Command',
    usage: 'Used to reset the prefix on your server.',
    run : async(client, message) => {
        message.channel.send("Are you sure you want to reset the prefix?").then(async (msg) => {
            const emoji = await confirmation(msg, message.author, ['✅', '❌'], 10000)
            if(emoji === '✅') {
                msg.delete()
                await prefixSchema.findOneAndDelete({ Guild : message.guild.id })
                message.channel.send(`The prefix has been reset to ${prefix}`)
            }
            if(emoji === '❌') {
                msg.delete()
                message.channel.send('reset prefix has been cancelled.')
            }
        })

    }
}
