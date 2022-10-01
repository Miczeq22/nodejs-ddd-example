import { ValueObject } from '@tools/building-blocks';
import { AccountEmailProps } from './account-email.types';
import { EmailDomainMustBeSupportedRule } from './rules/email-domain-must-be-supported.rule';
import { EmailFormatMustBeValidRule } from './rules/email-format-must-be-valid-rule';

export class AccountEmail extends ValueObject<AccountEmailProps> {
  private constructor(props: AccountEmailProps) {
    super(props);
  }

  public static createNew(email: string) {
    AccountEmail.checkRule(new EmailFormatMustBeValidRule(email));
    AccountEmail.checkRule(new EmailDomainMustBeSupportedRule(email));

    const [localPart, domain] = email.split('@');

    return new AccountEmail({
      localPart,
      domain,
    });
  }

  public toString() {
    return `${this.props.localPart}@${this.props.domain}`;
  }
}
