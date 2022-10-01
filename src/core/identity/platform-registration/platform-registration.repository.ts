import { PlatformRegistration } from './platform-registration.aggregate-root';

export interface PlatformRegistrationRepository {
  insert(platformRegistration: PlatformRegistration): Promise<void | never>;
}
