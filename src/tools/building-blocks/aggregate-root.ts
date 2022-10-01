import { DomainEvent } from './domain-event';
import { Entity } from './entity';

export abstract class AggregateRoot<PayloadType extends object = {}> extends Entity<PayloadType> {
  private domainEvents: DomainEvent[] = [];

  protected addDomainEvent(event: DomainEvent) {
    this.domainEvents.push(event);
  }

  public getDomainEvents(): ReadonlyArray<DomainEvent> {
    return this.domainEvents;
  }

  public clearDomainEvents() {
    this.domainEvents = [];
  }
}
