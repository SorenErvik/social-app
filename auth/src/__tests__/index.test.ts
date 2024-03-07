import request from 'supertest';
import app from '../app';

// Fix: Install type definitions for the test runner
it('Responds with a status of 200', async () => {
  await request(app).get('/').expect(200);
});
