import { AggregateRoot } from './aggregate-root';
import { DomainEvent } from './domain-event';

export interface EventDispatcher {
  dispatchEvent(event: DomainEvent): Promise<void>;

  dispatchEventsForAggregate(aggregate: AggregateRoot): Promise<void>;
}
