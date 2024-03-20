import { json } from 'body-parser';
import express from 'express';
import 'express-async-errors';

import { errorHandler } from './middlewares';
import { signupRouter } from './routes';

const app = express();

app.use(json());

app.use(signupRouter);

app.use(errorHandler);

export default app;
