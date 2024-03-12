import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

const signupRouter = express.Router();


signupRouter.post('/api/auth/signup', [
    body('email').isEmail().withMessage('Email must be in a valid format'), 
body('password').isLength({ min: 8, max: 32 }).withMessage('Password must be between 8 adn 32 characters in length'),
body('password').matches(/^(.*[a-z].*)$/).withMessage('Password must contain at least one lowercase letter'),
body('password').matches(/^(.*[A-Z].*)$/).withMessage('Password must contain at least one uppercase letter'),
body('password').matches(/^(.*[0-9].*)$/).withMessage('Password must contain at least one number')
], (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(422).send({});
    }
    res.send({});
})

export default signupRouter;