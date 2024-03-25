import dotenv from 'dotenv-safe';
import app from './app';

dotenv.config();

console.log(process.env.NODE_ENV);

app.listen(3000, () => {
  console.log('listening on port 3000');
});
