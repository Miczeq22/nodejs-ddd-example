import { Command } from './command';

export interface CommandHandler<
  CommandType extends Command<any>,
  ResultType extends object | void = void,
> {
  handle(command: CommandType): Promise<ResultType>;
}
