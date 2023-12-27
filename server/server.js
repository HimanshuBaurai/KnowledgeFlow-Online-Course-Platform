import app from "./app.js";
import { connectDB } from "./config/database.js";
import cloudinary from 'cloudinary';
import Razorpay from 'razorpay';
import nodeCron from 'node-cron';
import { Stats } from "./models/Stats.js";

//connnecting to DB using mongoose
connectDB();

//using cloudinary config
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET
});

nodeCron.schedule('0 0 0 1 * *', async () => {
  //this function will run every month, on 1st day of month
  //we will generate stats for the previous month and save it in db
  await Stats.create({}); //we will create a new document in db, and mongoose will automatically add createdAt field
});

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});