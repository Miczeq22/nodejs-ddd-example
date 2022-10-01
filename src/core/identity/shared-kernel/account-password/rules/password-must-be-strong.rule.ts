import { BusinessRule } from '@tools/building-blocks';

export class PasswordMustBeStrongRule implements BusinessRule {
  public message = 'Provided password is not strong enough.';

  constructor(private readonly password: string) {}

  public isBroken(): boolean {
    if (this.password.trim().length < 6) {
      this.message = `${this.message} Provide at least 6 characters.`;
      return true;
    }

    if (this.password.trim().length > 50) {
      this.message = 'Invalid password. Password can contain max of 50 characters.';
      return true;
    }

    if (!/.*[0-9].*/.test(this.password)) {
      this.message = `${this.message} Provide password with minimum one digit.`;
      return true;
    }

    return false;
  }
}
