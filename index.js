const Discord = require('discord.js');

const client = new Discord.Client();

const config = require('./commands/config.json');

const db = require('quick.db');

const fs = require('fs');

const ms = require('ms')

const cooldown = new Set();

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

console.log(client.commands);
// Make The Bot Active 24/7
const keepAlive = require("./server");
keepAlive();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setPresence({
        // You can show online, idle... Do not disturb is dnd
        activity: {
            name: "For ?help", // The message shown
            type: 'WATCHING' // PLAYING , WATCHING, LISTENING, STREAMING,
        }
    });
});

client.on("guildMemberAdd", (member) => { //usage of welcome event
  let chx = db.get(`welchannel_${member.guild.id}`); //defining var
  
  if(chx === null) { //check if var have value or not
    return;
  }

  let wembed = new Discord.MessageEmbed() //define embed
  .setAuthor(member.user.username, member.user.avatarURL())
  .setColor("#ff2050")
  .setThumbnail(member.user.avatarURL())
  .setDescription(`We are very happy to have you in our server`);
  
  client.channels.cache.get(chx).send(wembed) //get channel and send embed
})



client.on("message", message => {

    if (message.author.bot || message.channel instanceof Discord.DMChannel) {
        return;
    }

    let prefix = db.get(`prefix_${message.guild.id}`)
    if (prefix === null) prefix = config.default_prefix;
    if (!message.content.startsWith(prefix)) return;




    const args = message.content.slice(prefix.length).split(/ +/);

    const command = args.shift().toLowerCase();

    if (command === 'help') {
        client.commands.get('help').execute(message, args, Discord, fs, db, config);
    }

    if (command === 'ban') {
        client.commands.get('ban').execute(message, args, Discord);
    }

    if (command === 'purge') {
        client.commands.get('purge').execute(message, args, Discord);
    }

    if (command === 'kick') {
        client.commands.get('kick').execute(message, args, Discord);
    }

    if (command === 'addrole') {
        client.commands.get('addrole').execute(message, args, Discord);
    }

    if (command === 'removerole') {
        client.commands.get('removerole').execute(message, args, Discord);
    }

    if (command === 'mute') {
        client.commands.get('mute').execute(message, args, Discord, ms);
        //message.reply('Disabled for safety reasons.');
    }

    if (command === 'unmute') {
        client.commands.get('unmute').execute(message, args, Discord);
        //message.reply('Disabled for safety reasons.');
    }

    if (command === 'warn') {
        client.commands.get('warn').execute(message, args, Discord);
    }

    if (command === 't-role') {
        client.commands.get('t-role').execute(message, args, Discord);
    }

    if (command === 'ticket') {
        client.commands.get('ticket').execute(message, args, Discord);
    }

    if (command === 'close') {
        client.commands.get('close').execute(message, args, Discord);
    }

    if (command === 'punch') {
        client.commands.get('punch').execute(message, args, Discord);
    }

    if (command === 'prefix') {
        client.commands.get('prefix').execute(message, args, Discord, db);
    }

    if (command === 'serverinfo') {
        client.commands.get('serverinfo').execute(message, args, Discord);
    }

    if (command === 'start') {
        client.commands.get('start').execute(message, args, db, Discord);
    }

    if (command === 'balance' || command === "bal") {
        client.commands.get('balance').execute(message, args, db, Discord, config);
    }

     if (command === 'addmoney') {
        //client.commands.get('addmoney').execute(message, args, Discord, db);
        message.reply('Disabled for safety reasons.');
     }
    if (command === 'daily') {
        if (cooldown.has(`daily_${message.author.id}`)) {
            message.channel.send("You will have to wait until tomorrow")
        } else {
            client.commands.get('daily').execute(message, args, db, Discord);
            cooldown.add(`daily_${message.author.id}`)

            setTimeout(() => {
                cooldown.delete(`daily_${message.author.id}`)
            }, 8.64e+7)
        }
    }
    
    if (command === 'attack') {
        //client.commands.get('attack').execute(message, args, db, Discord);
        message.reply('In Development!')
    }

     if (command === 'randnum') {
        client.commands.get('randnum').execute(message, args, Discord);
    }

    if (command === 'meme') {
        client.commands.get('meme').run(message, args, Discord);
    }
    
    if (command === 'setwelcome') {
        client.commands.get('setwelcome').execute(message, args, Discord, db);
    }
   



});

client.login(process.env.TOKEN);
