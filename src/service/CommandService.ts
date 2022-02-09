import ICommand from '../model/command/ICommand';
import PingCommand from '../model/command/misc/PingCommand';
import ICommandService from './ICommandService';

export default class CommandService implements ICommandService {
  commands: ICommand[];

  constructor() {
    this.commands = [new PingCommand()];
  }

  public get(name = ''): ICommand | undefined {
    return this.commands.find(
      (command) =>
        (command.name === name && command.enabled) ||
        (command.alias.includes(name) && command.enabled)
    );
  }
}
