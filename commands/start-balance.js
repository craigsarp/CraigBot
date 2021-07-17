module.exports = {
  name: 'start',
  description: 'Start Command',
  usage: 'Used to start your Bank Account',
  execute(message, args, db, Discord) {
       if (db.get(`user_${message.author.id}.bal`) === null) {

    db.set(`user_${message.author.id}`, { bal: 0, xp: 0, inv: { weapon: "" } })
    message.reply("An account has been created for you.")

    }

    else {
      message.reply("You already have an account.")
    }
  }
}