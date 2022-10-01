import { BusinessRule } from '@tools/building-blocks';

export class EmailDomainMustBeSupportedRule implements BusinessRule {
  private readonly supportedDomains = ['gmail.com', 'outlook.com'];

  public readonly message = `Provided email domain is invalid, please use one of supported domains: ${this.supportedDomains.join(
    ', ',
  )}`;

  constructor(private readonly email: string) {}

  public isBroken(): boolean {
    const [, domain] = this.email.split('@');

    return !this.supportedDomains.includes(domain);
  }
}
