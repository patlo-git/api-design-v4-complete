// this file is the entry point to our server, and we want access to these variables immediately so we put them here.
// pull everything from our environment variables, loads them into our env and we can access on process.env.
import * as dotenv from 'dotenv';
dotenv.config();
import config from './config';
import app from './server';

app.listen(config.port, () => {
  console.log(`hello on http://localhost:${config.port}`)
})