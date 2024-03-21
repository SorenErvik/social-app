import express, { Request, Response } from 'express';
import { FieldValidationError, body, validationResult } from 'express-validator';
import { User } from '../models';

import { DuplicatedEmail, InvalidInput } from '../errors';
import { UserSignedUp } from '../events';

export const SIGNUP_ROUTE = '/api/auth/signup';

const signupRouter = express.Router();

signupRouter.post(
  SIGNUP_ROUTE,
  [
    body('email').isEmail().withMessage('Email must be in a valid format').normalizeEmail(),
    body('password')
      .trim()
      .isLength({ min: 8, max: 32 })
      .withMessage('Password must be between 8 and 32 characters in length')
      .escape(),
    body('password')
      .matches(/^(.*[a-z].*)$/)
      .withMessage('Password must contain at least one lowercase letter'),
    body('password')
      .matches(/^(.*[A-Z].*)$/)
      .withMessage('Password must contain at least one uppercase letter'),
    body('password')
      .matches(/^(.*[0-9].*)$/)
      .withMessage('Password must contain at least one number')
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req).array();
    //const errorsArray = errors.array();

      if (/.+@[A-Z]/g.test(req.body.email)) {
        const emailError: FieldValidationError = {
            value: req.body.email,
            msg: 'Email is not normalized',
            path: 'email',
            location: 'body',
            type: 'field'
        };
        errors.push(emailError);
    }

      if (/[><'"']/g.test(req.body.password)) {
        const emailError: FieldValidationError = {
          value: req.body.password,
          msg: 'Password contains invalid characters',
          path: 'password',
          location: 'body',
          type: 'field'
      };
      errors.push(emailError);
      }

    if (errors.length > 0) {
      throw new InvalidInput(errors);
    }

    

    const { email, password } = req.body;

    try {
      const newUser = await User.create({ email, password });
      const userSignedUp = new UserSignedUp(newUser);
      return res.status(userSignedUp.getStatusCode()).send(userSignedUp.serializeRest());
    } catch (e) {
      throw new DuplicatedEmail();
    }

    /*const existingUser = await User.findOne({ email });

if (existingUser) {
    return res.sendStatus(422);
}

const newUser = await User.create({ email, password});

    res.status(201).send({ email: newUser.email });
}) */
  }
);

export default signupRouter;
