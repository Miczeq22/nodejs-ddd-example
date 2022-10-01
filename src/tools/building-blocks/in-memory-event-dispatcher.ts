import { Logger } from '@infrastructure/logger/logger';
import { AggregateRoot } from './aggregate-root';
import { DomainEvent } from './domain-event';
import { EventDispatcher } from './event-dispatcher';
import { EventSubscriber } from './event-subscriber';

interface Dependencies {
  subscribers: EventSubscriber<any>[];
  logger: Logger;
}

export class InMemoryEventDispatcher implements EventDispatcher {
  constructor(private readonly dependencies: Dependencies) {}

  public async dispatchEvent(event: DomainEvent<{}>): Promise<void> {
    const subscriberHandlerPromises = this.dependencies.subscribers
      .filter((subscriber) => subscriber.type === event.name)
      .map((subscriber) =>
        subscriber
          .handle(event)
          .catch((error) =>
            this.dependencies.logger.error(
              `[Event Subscriber] Subscriber failed to handle event "${subscriber.type}".`,
              error,
            ),
          ),
      );

    if (!subscriberHandlerPromises.length) {
      return;
    }

    this.dependencies.logger.info(
      `[Event Subscriber] Dispatching handlers for event "${event.name}".`,
    );

    await Promise.all(subscriberHandlerPromises);
  }

  public async dispatchEventsForAggregate(aggregate: AggregateRoot<{}>): Promise<void> {
    const events = aggregate.getDomainEvents();

    aggregate.clearDomainEvents();

    const eventNames = events.map((event) => event.name);

    const subscriberHandlerPromises = this.dependencies.subscribers
      .filter((subscriber) => eventNames.includes(subscriber.type))
      .map((subscriber) => {
        const eventForSubscriber = events.find((event) => event.name === subscriber.type);

        return subscriber.handle(eventForSubscriber).catch((error) => {
          this.dependencies.logger.error(
            `[Event Subscriber] Subscriber failed to handle event "${subscriber.type}".`,
            error,
          );

          throw error;
        });
      });

    if (!subscriberHandlerPromises.length) {
      return;
    }

    this.dependencies.logger.info(
      `[Event Subscriber] Dispatching handlers for events ${eventNames.join(', ')}.`,
    );

    await Promise.all(subscriberHandlerPromises);
  }
}
