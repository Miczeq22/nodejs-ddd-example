import { AccountEmail } from '@core/identity/shared-kernel/account-email/account-email.value-object';
import { EmailChecker } from '@core/identity/shared-kernel/email-checker/email-checker.service';
import { BusinessRule } from '@tools/building-blocks';

export class EmailMustBeUniqueRule implements BusinessRule {
  public readonly message = 'Provided email is already taken.';

  constructor(private readonly email: AccountEmail, private readonly emailChecker: EmailChecker) {}

  public async isBroken(): Promise<boolean> {
    return !(await this.emailChecker.isUnique(this.email.toString()));
  }
}
