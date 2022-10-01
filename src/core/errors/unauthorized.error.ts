import { ApplicationError } from './application.error';

export class UnauthorizedError extends ApplicationError {
  constructor(message = 'Unauthorized.') {
    super(message, 'UnauthorizedError');
  }
}
