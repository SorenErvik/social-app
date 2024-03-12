

import { json } from 'body-parser';
import express from 'express';

import { signupRouter } from './routes';

const app = express();

app.use(json());

app.use(signupRouter);


export default app;
