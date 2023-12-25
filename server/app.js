import express from 'express';
import { config } from 'dotenv'; 
import ErrorMiddleware from './middlewares/Error.js';
import cookieParser from 'cookie-parser';

config({
    path: './config/config.env'
});

const app = express();
//using middlewares
app.use(express.json());//to parse json data from req.body
app.use(express.urlencoded({ extended: true }));//to parse url encoded data from req.body
app.use(cookieParser());//to parse cookies from req.cookies

//importing and using routes
import course from './routes/courseRoutes.js';
import user from './routes/userRoutes.js';
import payment from './routes/paymentRoutes.js';

app.use('/api/v1', course);
app.use('/api/v1', user);
app.use('/api/v1', payment);

export default app;

app.use(ErrorMiddleware);//ErrorMiddleware is imported from server/middlewares/Error.js