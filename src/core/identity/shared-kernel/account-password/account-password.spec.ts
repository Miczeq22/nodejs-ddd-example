import { BusinessRuleValidationError } from '@core/errors/business-rule-validation.error';
import { UnauthorizedError } from '@core/errors/unauthorized.error';
import { createMockProxy } from '@tools/mock-proxy';
import { PasswordHashProvider } from '../password-hash-provider/password-hash-provider.service';
import { AccountPassword } from './account-password.value-object';

describe('[Domain] Account Password Value Object', () => {
  const passwordHashProvider = createMockProxy<PasswordHashProvider>();

  beforeEach(() => {
    passwordHashProvider.mockClear();
  });

  describe('Password creation', () => {
    test('should throw an error if password contains less than 6 characters', async () => {
      await expect(() =>
        AccountPassword.createNew('12345', {
          passwordHashProvider,
        }),
      ).rejects.toThrowError(BusinessRuleValidationError);
    });

    test('should throw an error if password contains more than 50 characters', async () => {
      await expect(() =>
        AccountPassword.createNew(new Array(51).fill('#').join(''), {
          passwordHashProvider,
        }),
      ).rejects.toThrowError(BusinessRuleValidationError);
    });

    test("should throw an error if password don't contain at least one digit", async () => {
      await expect(() =>
        AccountPassword.createNew('#password', {
          passwordHashProvider,
        }),
      ).rejects.toThrowError(BusinessRuleValidationError);
    });

    test('should create new password', async () => {
      passwordHashProvider.hashPassword.mockResolvedValue('#password-hash');

      const password = await AccountPassword.createNew('mySecretPass123', {
        passwordHashProvider,
      });

      expect(password.getHash()).toEqual('#password-hash');
    });
  });

  describe('Password update', () => {
    test('should throw an error if old password is invalid', async () => {
      const accountPassword = await AccountPassword.createNew('mySecretPass123', {
        passwordHashProvider,
      });

      await expect(() =>
        accountPassword.updatePassword('#invalid-password', 'newMySecretPass123', {
          passwordHashProvider,
        }),
      ).rejects.toThrowError(UnauthorizedError);
    });

    test('should throw an error if new password is not strong enough', async () => {
      passwordHashProvider.isValidPassword.mockResolvedValue(true);

      const accountPassword = await AccountPassword.createNew('mySecretPass123', {
        passwordHashProvider,
      });

      await expect(() =>
        accountPassword.updatePassword('#password-hash', '12345', {
          passwordHashProvider,
        }),
      ).rejects.toThrowError(BusinessRuleValidationError);
    });
  });

  test('should udpate password', async () => {
    passwordHashProvider.isValidPassword.mockResolvedValue(true);
    passwordHashProvider.hashPassword.mockResolvedValue('#new-password-hash');

    const accountPassword = await AccountPassword.createNew('mySecretPass123', {
      passwordHashProvider,
    });

    const newAccountPassword = await accountPassword.updatePassword(
      '#password-hash',
      'newMySecretPass123',
      {
        passwordHashProvider,
      },
    );

    expect(newAccountPassword.getHash()).toEqual('#new-password-hash');
  });
});
