import { json } from 'body-parser';
import express from 'express';
import { routes } from './routes';

const { signupRouter } = routes;

const app = express();

app.use(json());

app.use(signupRouter);


export default app;
