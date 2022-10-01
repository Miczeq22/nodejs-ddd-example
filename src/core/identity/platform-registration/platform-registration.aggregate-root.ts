import { AggregateRoot, UniqueEntityID } from '@tools/building-blocks';
import { AccountEmail } from '../shared-kernel/account-email/account-email.value-object';
import { AccountPassword } from '../shared-kernel/account-password/account-password.value-object';
import { EmailChecker } from '../shared-kernel/email-checker/email-checker.service';
import { PasswordHashProvider } from '../shared-kernel/password-hash-provider/password-hash-provider.service';
import {
  PersistedPlatformRegistration,
  PlatformRegistrationProps,
  RegisterNewAccountPayload,
} from './platform-registration.types';
import { EmailMustBeUniqueRule } from './rules/email-must-be-unique.rule';

interface Dependencies {
  emailChecker: EmailChecker;
  passwordHashProvider: PasswordHashProvider;
}

export class PlatformRegistration extends AggregateRoot<PlatformRegistrationProps> {
  private constructor(props: PlatformRegistrationProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static async registerNewAccount(
    { email, password }: RegisterNewAccountPayload,
    { emailChecker, passwordHashProvider }: Dependencies,
  ) {
    const accountEmail = AccountEmail.createNew(email);

    await PlatformRegistration.checkRule(new EmailMustBeUniqueRule(accountEmail, emailChecker));

    return new PlatformRegistration({
      email: accountEmail,
      password: await AccountPassword.createNew(password, { passwordHashProvider }),
      registeredAt: new Date(),
    });
  }

  public toJSON(): PersistedPlatformRegistration {
    return {
      id: this.id.value,
      email: this.props.email.toString(),
      password: this.props.password.getHash(),
      registeredAt: this.props.registeredAt.toISOString(),
    };
  }
}
