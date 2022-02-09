import ICommand from '../model/command/ICommand';

export default interface ICommandService {
  commands: ICommand[];

  get(name: string): ICommand | undefined;
}
