import { ApplicationError } from '@core/errors/application.error';
import { BusinessRuleValidationError } from '@core/errors/business-rule-validation.error';
import { AsyncFunction } from './async-function';
import { BusinessRule } from './business-rule';

export abstract class ValueObject<PropsType extends object = {}> {
  constructor(public readonly props: PropsType) {}

  protected static checkRule(
    rule: BusinessRule,
    ErrorType: typeof ApplicationError = BusinessRuleValidationError,
  ): Promise<void> | void {
    if (rule.isBroken instanceof Promise || rule.isBroken instanceof AsyncFunction) {
      return (rule.isBroken() as Promise<boolean>).then((isBroken) => {
        if (isBroken) {
          throw new ErrorType(rule.message);
        }
      });
    }

    if (rule.isBroken()) {
      throw new ErrorType(rule.message);
    }
  }

  public equals(object: ValueObject<PropsType>) {
    if (!object) {
      return false;
    }

    if (!(object instanceof ValueObject)) {
      return false;
    }

    return JSON.stringify(this.props) === JSON.stringify(object.props);
  }
}
