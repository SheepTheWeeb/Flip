import DiscordJS, { Intents } from 'discord.js';
import dotenv from 'dotenv';
dotenv.config();

require('dotenv').config()

const client = new DiscordJS.Client({ 
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES
  ] 
});
const PREFIX = process.env.DISCORD_PREFIX;

client.on('ready', () => {
  console.log(`Logged in as ${client.user?.tag}!`);
});

client.on('messageCreate', msg => {
  if (msg.author.bot) {
    return;
  }

  if (msg.content === "hoi") {
    msg.channel.send("hoi");
    const salesMan = msg.guild?.emojis.cache.find(emoji => emoji.name === 'salesman');
    msg.react(salesMan || '👍');
  }
});

client.login(process.env.DISCORD_TOKEN);
