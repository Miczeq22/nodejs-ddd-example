import { AccountEmail } from './account-email.value-object';

describe('[Core] Account Email', () => {
  test('should throw an error if email format is invalid', () => {
    expect(() => AccountEmail.createNew('#invalid-format')).toThrowError(
      'Provided email have invalid format.',
    );
  });

  test('should throw an error if email format is valid but domain is not supported', () => {
    expect(() => AccountEmail.createNew('valid@format.com')).toThrowError(
      'Provided email domain is invalid, please use one of supported domains: gmail.com, outlook.com',
    );
  });

  test('should create email if format is valid and domain is supported', () => {
    const accountEmail = AccountEmail.createNew('john@gmail.com');

    expect(accountEmail.toString()).toEqual('john@gmail.com');
  });
});
