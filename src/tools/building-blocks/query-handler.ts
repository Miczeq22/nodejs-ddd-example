import { Query } from './query';

export interface QueryHandler<QueryType extends Query<any>, ResultType extends object> {
  handle(query: QueryType): Promise<ResultType>;
}
