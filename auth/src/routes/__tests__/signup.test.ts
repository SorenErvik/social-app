import request from 'supertest';
import app from '../../app';
import { SIGNUP_ROUTE } from '../signup';


/** Valid email condition:
 *  standard email formats from the express-validator package
 */
describe('Test validity of email input', () => {
    let password = '';

    beforeAll(() => {
        password = 'Validpassword1';
    });

    it('Should return 422 if the email is not provided', () => {
        return request(app).post(SIGNUP_ROUTE).send({ password }).expect(422);
    });
    it('Should return 422 if the email is not valid', async () => {
        await request(app).post(SIGNUP_ROUTE).send({}).expect(422);
        await request(app).post(SIGNUP_ROUTE).send({email: 'invalidEmail', password}).expect(422);
    });
    it('Should return 200 if the email is valid', async () => {
        await request(app).post(SIGNUP_ROUTE).send({email: 'test@test.com', password }).expect(200);
    });
});


/** Valid passowrd condition:
 * At least 8 characters
 * At most 32 characters
 * One lower-case letter
 * One upper-case letter
 * One number
 */
describe('test validity of password input', () => {
    let email = '';
    beforeAll(() => {
        email = 'test@test.com';
    });

    it('Should return 422if the password is not provided', async () => {
        await request(app).post(SIGNUP_ROUTE).send({email}).expect(422);
    });
    it('Should return 422 if the passowrd contains less than 8 characters', async () => {
        await request(app).post(SIGNUP_ROUTE).send({email, password: 'Valid12'}).expect(422);
    });
    it('Should return 422 if the password contains more than 32 characters', async () => {
       await request(app).post(SIGNUP_ROUTE).send({email, password: 'Validpassword123456789012345678901234567890'}).expect(422);
    });
    it('Should return 422 if the password does not contain at least one lowercase letter', async () => {
        await request(app).post(SIGNUP_ROUTE).send({email, password: 'VALIDPASSWORD1'}).expect(422);
    });
    it('Should return 422 if the password does not contain atleast one uppercase letter', async () => {
        await request(app).post(SIGNUP_ROUTE).send({email, password: 'validpassword1'}).expect(422);
    });
    it('Should return 422 if the password does not contain atleast one number', async () => {
        await request(app).post(SIGNUP_ROUTE).send({email, password: 'Validpassword'}).expect(422);
    });
    it('Should return 200 if the password is valid', async () => {
        await request(app).post(SIGNUP_ROUTE).send({email, password: 'Validpassword1'}).expect(200);
    });
});
