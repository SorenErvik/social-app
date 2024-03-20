import { InvalidInput } from '../index';
import { InvalidInputConstructorErrorsParam } from '../invalid-input';

/*type SerializedErrors = {
    errors: {
        message: string;
        fields?: {
            fieldname: string[]
        }[]
    }[]
}; */

describe('tests the InvalidInput custom error class', function () {
  it('should have a status code of 422', () => {
    const invalidInput = new InvalidInput();
    expect(invalidInput.getStatusCode()).toEqual(422);
  });

  it('should return the errors in the serialized format', () => {
    const errors: InvalidInputConstructorErrorsParam = [
      {
        type: 'field',
        value: 'Valid12',
        msg: 'Password must be between 8 and 32 characters',
        path: 'password',
        location: 'body'
      },
      {
        type: 'field',
        value: 'Valid12',
        msg: 'Password must contain an uppercase letter',
        path: 'password',
        location: 'body'
      }
    ];

    const result = {
      fields: {
        password: [
          'Password must be between 8 and 32 characters',
          'Password must contain an uppercase letter'
        ]
      }
    };
    const invalidInputError = new InvalidInput(errors);
    const serializedErrors = invalidInputError.serializeErrorOutput();

    expect(serializedErrors.errors).toHaveLength(1);

    const { fields = {} } = serializedErrors.errors[0];

    expect(serializedErrors.errors[0].message).toEqual('The input provided is invalid');
    expect(Object.keys(fields)).toHaveLength(1);
    expect(Object.keys(fields)).toEqual(['password']);
    expect(fields.password).toHaveLength(2);
    expect(fields.password).toContain('Password must be between 8 and 32 characters');
    expect(fields.password).toContain('Password must contain an uppercase letter');
  });
});
