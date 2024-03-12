import request from 'supertest';
import app from '../../app';

/*it('Should return 405 for non-post requests to the signup route', () => {

});*/
/** Valid email condition:
 *  standard email formats from the express-validator package
 */
describe('Test validity of email input', () => {
    let password = '';

    beforeAll(() => {
        password = 'Validpassword1';
    });

    it('Should return 422 if the email is not valid', async () => {
        await request(app).post('/api/auth/signup').send({}).expect(422);
        await request(app).post('/api/auth/signup').send({email: 'invalidEmail', password}).expect(422);
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
    it('Should return 422 if the passowrd contains less than 8 characters', async () => {
        
    });
    it('Should return 422 if the pasword contains more than 32 characters', async () => {
       
    });
    it('Should return 422 if the password does not contain atleast one lowercase letter', async () => {

    });
    it('Should return 422 if the password does not contain atleast one uppercase letter', async () => {

    });
    it('Should return 422 if the password does not contain atleast one number', async () => {

    });
});
