module.exports = {
  name: 'ping',
  description: 'Ping Command',
  usage: 'Used to check the ping/latency of the bot.',
  execute(message, args, Discord, client) {
    message.channel.send(`🏓Latency is ${Date.now() - message.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`);
  }
}
