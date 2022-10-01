import { ApplicationError } from './application.error';

export class NotFoundError extends ApplicationError {
  constructor(message = 'Not Found.') {
    super(message, 'NotFoundError');
  }
}
