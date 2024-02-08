import 'dotenv/config';

import express from 'express';

import routes from './routes';

const app = express();

app.use(routes)


app.listen(3333, () => 'server running on port 3333')