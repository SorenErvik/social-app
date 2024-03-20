import { DuplicatedEmail } from '../index';

it('should have a status code of 422', () => {
    const duplicatedEmailError = new DuplicatedEmail();
    expect(duplicatedEmailError.getStatusCode()).toEqual(422);
});

it('should return the errors in the serialized formatter', () => {
    const duplicatedEmailError = new DuplicatedEmail();
    const serializeErrorOutput = duplicatedEmailError.serializeErrorOutput();

    expect(serializeErrorOutput.errors).toHaveLength(1);
    expect(serializeErrorOutput.errors[0].message).toEqual('The email is already in the database')
});