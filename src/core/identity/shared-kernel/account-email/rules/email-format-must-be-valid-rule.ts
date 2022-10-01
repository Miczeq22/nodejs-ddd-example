import { BusinessRule } from '@tools/building-blocks';

export class EmailFormatMustBeValidRule implements BusinessRule {
  public readonly message = 'Provided email have invalid format.';

  private readonly emailPattern = new RegExp(
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
  );

  constructor(private readonly email: string) {}

  public isBroken(): boolean {
    return !this.emailPattern.test(this.email);
  }
}
