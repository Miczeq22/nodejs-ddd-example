import { ApplicationError } from './application.error';

export class BusinessRuleValidationError extends ApplicationError {
  constructor(message: string) {
    super(message, 'BusinessRuleValidationError');
  }
}
