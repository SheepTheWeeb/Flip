// eslint-disable-next-line
require('dotenv').config();
import DiscordJS, { Intents } from 'discord.js';
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

client.on('ready', () => {
  console.log(`Logged in as ${client.user?.tag}!`);
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
