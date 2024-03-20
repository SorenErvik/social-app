import { FieldValidationError, ValidationError } from 'express-validator';
import { BaseCustomError } from './base-custom-error';
import { SerializedErrorField, SerializedErrorOutput } from './types/serialized-error-output';

export type InvalidInputConstructorErrorsParam = ValidationError[];

export default class InvalidInput extends BaseCustomError {
  protected statusCode = 422;

  protected errors: ValidationError[] | undefined;


  protected defaultErrorMessage = 'The input provided is invalid';

  constructor(errors?: InvalidInputConstructorErrorsParam) {
    super('The input provided is invalid');
    this.errors = errors;
    Object.setPrototypeOf(this, InvalidInput.prototype);
  }

  getStatusCode(): number {
    return this.statusCode;
  }

  serializeErrorOutput(): SerializedErrorOutput {
    return this.parseValidationErrors();
  }

  private parseValidationErrors(): SerializedErrorOutput {
    const parsedErrors: SerializedErrorField = {};

    if (this.errors && this.errors.length > 0) {
      this.errors.forEach((error) => {
        if (error.type === 'field') {
          const fieldError = error as FieldValidationError;
          if (fieldError.path) {
            if (parsedErrors[fieldError.path]) {
              parsedErrors[fieldError.path].push(fieldError.msg);
            } else {
              parsedErrors[fieldError.path] = [fieldError.msg];
            }
          } else {
            parsedErrors[fieldError.path] = [fieldError.msg];
          }
        }
      });
    }

    return {
      errors: [
        {
          message: this.defaultErrorMessage,
          fields: parsedErrors
        }
      ]
    };
  }
}
