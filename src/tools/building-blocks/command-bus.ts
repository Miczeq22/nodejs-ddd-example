import { Command } from './command';

export interface CommandBus {
  handle(command: Command<any>): Promise<unknown>;
}
