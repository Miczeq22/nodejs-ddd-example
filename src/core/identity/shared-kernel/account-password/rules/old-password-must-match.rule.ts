import { BusinessRule } from '@tools/building-blocks';
import { PasswordHashProvider } from '../../password-hash-provider/password-hash-provider.service';

export class OldPasswordMustMatchRule implements BusinessRule {
  public readonly message = 'Unauthorized.';

  constructor(
    private readonly oldPassword: string,
    private readonly passwordHash: string,
    private readonly passwordHashProvider: PasswordHashProvider,
  ) {}

  public async isBroken(): Promise<boolean> {
    return !(await this.passwordHashProvider.isValidPassword(this.oldPassword, this.passwordHash));
  }
}
