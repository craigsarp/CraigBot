module.exports = {
    name: 'prefix',
    description: 'Prefix Command',
    usage: 'Used to change the prefix on your server.',
     run: async (message, args, Discord, db) => {
        if (!message.member.hasPermission("ADMINISTRATOR")) {
            return message.channel.send("No no no.");
        }
        const PrefixSchema = require('../schema/PrefixSchema')
        const newprefix = args[0]
    if(!newprefix) return message.channel.send("please provide a new prefix!") 
    if(newprefix.length > 5) return message.channel.send('This prefix is too long, you have max 5 caracters')


    let data;
    try {
        data = await PrefixSchema.findOne({
            _id: message.guild.id
        })
        if(!data) {
            let newdata = await PrefixSchema.create({
                _id: message.guild.id,
                newPrefix: newprefix
            })
            newdata.save()
        } else {
            await PrefixSchema.findOneAndUpdate({
                _id: message.guild.id,
                newPrefix: newprefix,
            })
        }
        message.channel.send(`The Prefix has Been set to ${newprefix}`)
    } catch (err) {
        console.log(err)
    }
    }
}
