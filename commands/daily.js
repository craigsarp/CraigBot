module.exports = {
  name: 'daily',
  description: 'Daily Command',
  usage: 'Used to get your daily reward.',
  execute(message, args, db, Discord) {
  if (db.get(`user_${message.author.id}.bal`) === null) {
      message.reply(`You need to first create an account using \`${PREFIX}start\``)
    }

    else {

    let rand = Math.floor(Math.random() * (1000 - 500) + 500)

    db.add(`user_${message.author.id}.bal`, rand)

    message.channel.send(`You have received ${rand} coins`)

    }
  }
}