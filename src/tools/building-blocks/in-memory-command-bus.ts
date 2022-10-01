import { NotFoundError } from '@core/errors/not-found.error';
import { Logger } from '@infrastructure/logger/logger';

import { Command } from './command';
import { CommandBus } from './command-bus';
import { CommandHandler } from './command-handler';

interface CommandHandlers {
  [key: string]: CommandHandler<any, any>;
}

interface Dependencies {
  commandHandlers: CommandHandler<any, any>[];
  logger: Logger;
}

export class InMemoryCommandBus implements CommandBus {
  private existingCommandHandlers: CommandHandlers = {};

  constructor(private readonly dependencies: Dependencies) {
    this.existingCommandHandlers = dependencies.commandHandlers.reduce(
      (commandHandlers: CommandHandlers, currentHandler: CommandHandler<any, any>) => {
        return {
          ...commandHandlers,
          [this.getConstructorName(currentHandler)]: currentHandler,
        };
      },
      {},
    );
  }

  public async handle(command: Command<any>): Promise<unknown> {
    const existingCommandHandler =
      this.existingCommandHandlers[this.getCommandHandlerName(command)];

    if (!existingCommandHandler) {
      throw new NotFoundError(
        `Command Handler for command: "${this.getConstructorName(command)}" does not exist.`,
      );
    }

    this.dependencies.logger.info(
      `[Command Bus] Executing handler for command: ${command.constructor.name}`,
    );
    return existingCommandHandler.handle(command);
  }

  private getConstructorName(object: object) {
    return object.constructor.name;
  }

  private getCommandHandlerName(command: Command<any>) {
    return `${this.getConstructorName(command)}Handler`;
  }
}
