export abstract class Identifier<ValueType> {
  constructor(public readonly value: ValueType) {}

  public equals(id: Identifier<ValueType>) {
    if (!id) {
      return false;
    }

    if (!(id instanceof Identifier)) {
      return false;
    }

    return id.value === this.value;
  }
}
