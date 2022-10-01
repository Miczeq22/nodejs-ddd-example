import { UnauthorizedError } from '@core/errors/unauthorized.error';
import { ValueObject } from '@tools/building-blocks';
import { PasswordHashProvider } from '../password-hash-provider/password-hash-provider.service';
import { AccountPasswordProps } from './account-password.types';
import { OldPasswordMustMatchRule } from './rules/old-password-must-match.rule';
import { PasswordMustBeStrongRule } from './rules/password-must-be-strong.rule';

interface Dependencies {
  passwordHashProvider: PasswordHashProvider;
}

export class AccountPassword extends ValueObject<AccountPasswordProps> {
  private constructor(props: AccountPasswordProps) {
    super(props);
  }

  public static async createNew(password: string, { passwordHashProvider }: Dependencies) {
    AccountPassword.checkRule(new PasswordMustBeStrongRule(password));

    const passwordHash = await passwordHashProvider.hashPassword(password);

    return new AccountPassword({
      passwordHash,
    });
  }

  public async updatePassword(
    oldPassword: string,
    newPassword: string,
    { passwordHashProvider }: Dependencies,
  ) {
    await AccountPassword.checkRule(
      new OldPasswordMustMatchRule(oldPassword, this.props.passwordHash, passwordHashProvider),
      UnauthorizedError,
    );

    AccountPassword.checkRule(new PasswordMustBeStrongRule(newPassword));

    const passwordHash = await passwordHashProvider.hashPassword(newPassword);

    return new AccountPassword({
      passwordHash,
    });
  }

  public getHash() {
    return this.props.passwordHash;
  }
}
