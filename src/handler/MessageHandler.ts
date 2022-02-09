import { Message } from 'discord.js';

export default class MessageHandler {
  prefix: string;

  constructor(prefix: string) {
    this.prefix = prefix;
  }

  public async handle(msg: Message) {
    if (msg.author.bot) return;

    if (msg.content === 'hoi') {
      msg.channel.send('hoi');
      const salesMan = msg.guild?.emojis.cache.find(
        (emoji) => emoji.name === 'salesman'
      );
      msg.react(salesMan || '👍');
    }
  }
}
