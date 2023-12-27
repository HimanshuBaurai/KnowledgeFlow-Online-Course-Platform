import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { Stats } from "../models/Stats.js";
import { sendEmail } from "../utils/sendEmail.js";

export const contact = catchAsyncError(async (req, res, next) => {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }
    //we can save this in db also, but we will send these details to our email
    const data = { //data to be sent to our email
        to: process.env.MY_MAIL,
        subject: `Message from KnowledgeFlow by ${name}`,
        text: `${message} \n\n Sender: ${name} \n Sender Email: ${email}`,
    }

    await sendEmail(data.to, data.subject, data.text);

    res.status(200).json({
        success: true,
        message: "Message sent successfully",
    })
})

export const courseRequest = catchAsyncError(async (req, res, next) => {
    const { name, email, course } = req.body;
    if (!name || !email || !course) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }
    //we can save this in db also, but we will send these details to our email
    const data = { //data to be sent to our email
        to: process.env.MY_MAIL,
        subject: `Course Request from KnowledgeFlow by ${name}`,
        text: `${name} requested for the course "${course}" \n\n Sender: ${name} \n Sender Email: ${email}`,
    }

    await sendEmail(data.to, data.subject, data.text);

    res.status(200).json(
        {
            success: true,
            message: "Course request sent successfully",
        }
    )
})

export const getDashboardStats = catchAsyncError(async (req, res, next) => {
    const stats = await Stats.find({}).sort({ createdAt: "desc" }).limit(12); // we will get the last 12 stats
    //use Nodecron to generate stats every month, and save it in db, nodecron will run a function every month

    const statsData = [];
    for (let i = 0; i < stats.length; i++) {
        statsData.unshift(stats[i]);
    }

    const requiredSize = 12 - stats.length;
    for (let i = 0; i < requiredSize; i++) {
        statsData.unshift({ users: 0, subscription: 0, views: 0 });
    }


    //last month stats
    const usersCount = statsData[11].users;
    const subscriptionCount = statsData[11].subscription;
    const viewsCount = statsData[11].views;

    let usersPercentage = 0;
    let subscriptionPercentage = 0;
    let viewsPercentage = 0;
    let usersProfit = true;
    let subscriptionProfit = true;
    let viewsProfit = true;

    if (statsData[10].users === 0) usersPercentage = usersCount * 100;
    else usersPercentage = (usersCount - statsData[10].users) / statsData[10].users * 100;
    if (statsData[10].subscription === 0) subscriptionPercentage = subscriptionCount * 100;
    else subscriptionPercentage = (subscriptionCount - statsData[10].subscription) / statsData[10].subscription * 100;
    if (statsData[10].views === 0) viewsPercentage = viewsCount * 100;
    else viewsPercentage = (viewsCount - statsData[10].views) / statsData[10].views * 100;

    if (usersPercentage < 0) usersProfit = false;
    if (subscriptionPercentage < 0) subscriptionProfit = false;
    if (viewsPercentage < 0) viewsProfit = false;

    res.status(200).json({
        success: true,
        stats: statsData,
        usersCount,
        subscriptionCount,
        viewsCount,
        usersPercentage,
        subscriptionPercentage,
        viewsPercentage,
        usersProfit,
        subscriptionProfit,
        viewsProfit,
    })
})