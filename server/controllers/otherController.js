import { catchAsyncError } from "../middlewares/catchAsyncError.js";
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
    const totalUsers = await User.countDocuments({ role: "user" });
    const totalAdmins = await User.countDocuments({ role: "admin" });
    const totalSubscribers = await User.countDocuments({ "subscription.status": "active" });
    res.status(200).json({
        success: true,
        totalUsers,
        totalAdmins,
        totalSubscribers,
    })
})