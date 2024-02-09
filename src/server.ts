import 'dotenv/config';
import "reflect-metadata"

import express from 'express';

import routes from './routes';

const app = express();

app.use(routes)
export default app

app.listen(3333, () => 'server running on port 3333')