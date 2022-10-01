import { Query } from './query';

export interface QueryBus {
  handle(query: Query<any>): Promise<unknown>;
}
