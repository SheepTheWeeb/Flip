import { Message } from 'discord.js';
import { commandService } from '../index';

export default class MessageHandler {
  prefix: string;

  constructor(prefix: string) {
    this.prefix = prefix;
  }

  public handle(msg: Message) {
    if (msg.author.bot) return;

    let msgString = msg.content;

    // Validate and remove prefix
    if (msgString.startsWith(this.prefix)) {
      msgString = msgString.substring(this.prefix.length).trim();
    } else {
      return;
    }

    // Get commandname and arguments
    const commandName = msgString.split(' ')[0];
    const args = msgString.split(' ').slice(1);

    // Execute command
    const command = commandService.get(commandName);
    if (command) command.execute(msg, args);
  }
}
