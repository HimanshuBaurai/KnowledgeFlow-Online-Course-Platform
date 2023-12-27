import express from 'express';
import { config } from 'dotenv';
import ErrorMiddleware from './middlewares/Error.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';//to allow cross origin requests

config({
    path: './config/config.env'
});

const app = express();
//using middlewares
app.use(express.json());//to parse json data from req.body
app.use(express.urlencoded({ extended: true }));//to parse url encoded data from req.body
app.use(cookieParser());//to parse cookies from req.cookies
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,//to allow cookies to be sent from frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));//to allow cross origin requests

//importing and using routes
import course from './routes/courseRoutes.js';
import user from './routes/userRoutes.js';
import payment from './routes/paymentRoutes.js';
import other from './routes/otherRoutes.js';

app.use('/api/v1', course);
app.use('/api/v1', user);
app.use('/api/v1', payment);
app.use('/api/v1', other);

export default app;

app.get('/', (req, res, next) => {
    res.send(`<h1>Hello from server. Click <a href=${process.env.FRONTEND_URL}>Here</a> to visit frontend<h1>`);
});//this is just for testing, we will remove this later

app.use(ErrorMiddleware);//ErrorMiddleware is imported from server/middlewares/Error.js