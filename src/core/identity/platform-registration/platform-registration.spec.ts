import { BusinessRuleValidationError } from '@core/errors/business-rule-validation.error';
import { createMockProxy } from '@tools/mock-proxy';
import { EmailChecker } from '../shared-kernel/email-checker/email-checker.service';
import { PasswordHashProvider } from '../shared-kernel/password-hash-provider/password-hash-provider.service';
import { PlatformRegistration } from './platform-registration.aggregate-root';

describe('[Core] Platform Registration', () => {
  const emailChecker = createMockProxy<EmailChecker>();
  const passwordHashProvider = createMockProxy<PasswordHashProvider>();

  beforeEach(() => {
    emailChecker.mockClear();
    passwordHashProvider.mockClear();
  });

  test('should throw an error if email is not unique', async () => {
    emailChecker.isUnique.mockResolvedValue(false);

    await expect(() =>
      PlatformRegistration.registerNewAccount(
        {
          email: 'john@gmail.com',
          password: 'test123',
        },
        {
          passwordHashProvider,
          emailChecker,
        },
      ),
    ).rejects.toThrowError(BusinessRuleValidationError);
  });

  test('should create account', async () => {
    const now = new Date();

    emailChecker.isUnique.mockResolvedValue(true);
    passwordHashProvider.hashPassword.mockResolvedValue('#hashed-password');

    jest.useFakeTimers().setSystemTime(now);

    const platformRegistration = await PlatformRegistration.registerNewAccount(
      {
        email: 'john@gmail.com',
        password: 'test123',
      },
      {
        passwordHashProvider,
        emailChecker,
      },
    );

    const { id, ...data } = platformRegistration.toJSON();

    expect(typeof id).toEqual('string');

    expect(data).toStrictEqual({
      email: 'john@gmail.com',
      password: '#hashed-password',
      registeredAt: now.toISOString(),
    });
  });
});
