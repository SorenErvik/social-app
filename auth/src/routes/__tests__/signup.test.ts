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


describe('tests sanitization of email input', () => {
    it('should not contain uppercase letters in the domain of the email', async () => {
        const normalizedEmail = 'test@test.com';
        const response = await request(app)
        .post(SIGNUP_ROUTE)
        .send({
        email: 'test@TEST.COM',
        password: 'Valid123' })
        .expect(200);

        expect(response.body.email).toEqual(normalizedEmail);
    });
});

describe('tests sanitization of password input', () => {
    it('should not contain unescaped characters', async () => {
        await request(app).post(SIGNUP_ROUTE).send({
            email: 'test@test.com',
            password: 'Valid123<'
        }).expect(200);
    });
});

describe('tests saving the signed up user to the database', () => {
    it('saves the user successfully as long as the information is valid', () => {
        // Send valid user information
        //Receive the user information back from the route
        // Check whether I can find the user in the database by using the _id or email property
    });

    it('does not allow saving a suer with a duplicate email', () => {
        // Send valid user information
        // Send the same user information again
        // Should return the respective HTTP error code 
    });
});