import 'dotenv/config';
import Discord from 'discord.js';

const client = new Discord.Client();
client.login(process.env.TOKEN);

client.login('token');

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('Pong!');
  }
});



console.log('Hello Node.js project.');

console.log(process.env.TOKEN);