import { DomainEvent } from './domain-event';

export interface EventSubscriber<EventType extends DomainEvent<any>> {
  type: string;

  handle(event: EventType): Promise<void>;
}
