import { GuildEmoji, Message } from 'discord.js';

export default class FlipUtils {
  static findEmoji(msg: Message, name: string): GuildEmoji | undefined {
    return msg.guild?.emojis.cache.find((emoji) => emoji.name === name);
  }
}
