import { AccountEmail } from '../shared-kernel/account-email/account-email.value-object';
import { AccountPassword } from '../shared-kernel/account-password/account-password.value-object';

export interface PlatformRegistrationProps {
  email: AccountEmail;
  password: AccountPassword;
  registeredAt: Date;
}

export interface RegisterNewAccountPayload {
  email: string;
  password: string;
}

export interface PersistedPlatformRegistration {
  id: string;
  email: string;
  password: string;
  registeredAt: string;
}
