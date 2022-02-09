import { Message } from 'discord.js';

export default interface ICommand {
  name: string;
  alias: string[];
  description: string;
  usage: string;
  enabled: boolean;

  execute(msg: Message, args: string[]): void;
}
