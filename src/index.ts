// eslint-disable-next-line
require('dotenv').config();
import DiscordJS, { Intents, TextChannel } from 'discord.js';
import cron from 'cron';
import MessageHandler from './handler/MessageHandler';
import CommandService from './service/CommandService';
import ICommandService from './service/ICommandService';

const client = new DiscordJS.Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
});
const messageHandler: MessageHandler = new MessageHandler(
  process.env.DISCORD_PREFIX || '!'
);

const commandService: ICommandService = new CommandService();
export { commandService };

const dailyMessageTimer = new cron.CronJob('00 00 00 * * *', () => {
  const channel = client.channels.cache.find(
    (c) => c.id === '921520199780413551'
  );
  if (channel && channel.isText()) {
    (channel as TextChannel).send(
      '<@229163297411170305>, ga slapen! (Grote boos)'
    );
  }
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user?.tag}!`);
  dailyMessageTimer.start();
});

client.on('messageCreate', (msg) => {
  messageHandler.handle(msg);
});

client.login(process.env.DISCORD_TOKEN);

process.on('uncaughtException', (err: Error) => {
  console.log(`Uncaught Exception: ${err.stack}`);
  // process.exit(1) Best practice is to exit app on errors so that Docker can restart automatically
});

process.on('unhandledRejection', (err: Error) => {
  console.log(`Unhandled rejection: ${err.stack}`);
});
