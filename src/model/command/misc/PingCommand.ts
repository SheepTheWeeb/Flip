import { Message } from 'discord.js';
import FlipUtils from '../../../util/FlipUtils';
import ICommand from '../ICommand';

export default class PingCommand implements ICommand {
  name: string;
  alias: string[];
  description: string;
  usage: string;
  enabled: boolean;

  public constructor() {
    this.name = 'ping';
    this.alias = ['pong', 'test'];
    this.description = "Ping command, answers with 'Pong!'.";
    this.usage = 'ping';
    this.enabled = true;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public execute(msg: Message<boolean>, args: string[]): void {
    if (!this.enabled) {
      console.log(`Command '${this.name}' is disabled but still called.`);
      return;
    }

    msg.channel.send('Pong!');
    msg.react(FlipUtils.findEmoji(msg, 'salesman') || '👍');
  }
}
