export interface DomainEvent<PayloadType extends object = {}> {
  name: string;

  module: string;

  payload: PayloadType;
}
