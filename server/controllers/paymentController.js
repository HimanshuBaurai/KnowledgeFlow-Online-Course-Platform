import ErrorHandler from "../utils/errorHandler.js";
import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { User } from "../models/User.js";
import { instance } from "../server.js";

export const buySubscription = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user._id);
    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }
    if (user.role === "admin") {
        return next(new ErrorHandler("Admin cannot buy subscription", 400));
    }


    const plan_id = process.env.PLAN_ID || "plan_NGSAODA4JrczxW";

    const subscription = await instance.subscriptions.create({
        plan_id,//plan id
        total_count: 12,//billed every month for 12 months 
        customer_notify: 1,//send email to customer
    });

    user.subscription.id = subscription.id;
    user.subscription.status = subscription.status;
    await user.save({ validateBeforeSave: false }); //validateBeforeSave is set to false because we are not validating the user before saving

    res.status(200).json({
        success: true,
        subscriptionId: subscription.id,
    });
});