import routes from './routes';

import { json } from 'body-parser';
import express from 'express';

const { signupRouter } = routes;

const app = express();

app.use(json());

app.use(signupRouter);


export default app;
