export interface Command<PayloadType extends object = {}> {
  payload: PayloadType;
}
