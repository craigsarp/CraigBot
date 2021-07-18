const Discord = require('discord.js');

const client = new Discord.Client();

const config = require('./commands/config.json');

const db = require('quick.db');

const fs = require('fs');

const ms = require('ms');

const weather = require('weather-js');

const mongoose = require('mongoose');
const dbOptions = {
           useNewUrlParser: true,
           useUnifiedTopology: true,
           autoIndex: false,
           reconnectTries: Number.MAX_VALUE,
           reconnectInterval: 500,
           poolSize: 5,
           connectTimeoutMS: 10000,
           family:4
       };

       mongoose.connect(process.env.mongoPath, dbOptions);
       mongoose.set('useFindAndModify', false);
       mongoose.Promise = global.Promise;

       mongoose.connection.on('connected', () => {
           console.log('Mongoose has successfully connected!');
       });

       mongoose.connection.on('err', err => {
           console.error(`Mongoose connection error: \n${err.stack}`);
       });

       mongoose.connection.on('disconnected', () => {
           console.warn('Mongoose connection lost');
       });

const prefixSchema = require('./models/prefix.js');
const welcomeSchema = require('./models/welcome-schema');

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

client.on('ready', async () => {
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
 welcomeSchema.findOne({ guildId: member.guild.id }, async (err, data) => {
        if(!data) return;

        const user = member.user;
        const channel = member.guild.channels.cache.get(data.channelId);

        channel.send(`Welcome ${user}!`)
    })
})



client.on("message", async(message) => {

    if (message.author.bot || message.channel instanceof Discord.DMChannel) {
        return;
    }
     const id = message.guild.id;
     const data = await prefixSchema.findOne({
        GuildID: id
    });
    let prefix;
    if (data) {
       prefix = data.Prefix;
    } else {
       prefix = config.default_prefix;
    }




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
        client.commands.get('prefix').run(client, message, args, prefixSchema, data);
    }

    if (command === 'serverinfo') {
        client.commands.get('serverinfo').execute(message, args, Discord);
    }

    if (command === 'start') {
        //client.commands.get('start').execute(message, args, db, Discord);
        message.reply('Disabled for safety reasons.');
    }

    if (command === 'balance' || command === "bal") {
        //client.commands.get('balance').execute(message, args, db, Discord, config);
        message.reply('Disabled for safety reasons.');
    }

     if (command === 'addmoney') {
        //client.commands.get('addmoney').execute(message, args, Discord, db);
        message.reply('Disabled for safety reasons.');
     }
    if (command === 'daily') {
        /*if (cooldown.has(`daily_${message.author.id}`)) {
            message.channel.send("You will have to wait until tomorrow")
        } else {
            client.commands.get('daily').execute(message, args, db, Discord);
            cooldown.add(`daily_${message.author.id}`)

            setTimeout(() => {
                cooldown.delete(`daily_${message.author.id}`)
            }, 8.64e+7)
        }*/
        message.reply('Disabled for safety reasons.');
    }
    
    if (command === 'attack') {
        //client.commands.get('attack').execute(message, args, db, Discord);
        message.reply('Disabled for safety reasons.');
    }

     if (command === 'randnum') {
        client.commands.get('randnum').execute(message, args, Discord);
    }

    if (command === 'meme') {
        client.commands.get('meme').run(message, args, Discord);
    }
    
    if (command === 'setwelcome') {
        client.commands.get('setwelcome').run(client, message, args, welcomeSchema);;
    }
    
    if (command === 'ping') {
        client.commands.get('ping').execute(message, args, Discord, client);
    }
   
    if (command === 'weather') {
        client.commands.get('weather').execute(message, args, Discord, weather);
    }   
           
    if (command === 'gayrate') {
        client.commands.get('gayrate').execute(message, args, Discord);
    }  
           
    if (command === '8ball') {
        client.commands.get('8ball').execute(message, args, Discord);
    }   

          

});

client.login(process.env.TOKEN);
