import express from 'express';
import { config } from 'dotenv';

config({
    path: './config/config.env'
});

const app = express();
//using middlewares
app.use(express.json());//to parse json data from req.body
app.use(express.urlencoded({ extended: true }));//to parse url encoded data from req.body

//importing and using routes
import course from './routes/courseRoutes.js';
import user from './routes/userRoutes.js';
//importing and using middlewares
import ErrorMiddleware from './middlewares/Error.js';

app.use('/api/v1', course);
app.use('/api/v1', user);

export default app;

app.use(ErrorMiddleware);//ErrorMiddleware is imported from server/middlewares/Error.js