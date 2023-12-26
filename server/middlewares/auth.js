import jwt from "jsonwebtoken";
import { catchAsyncError } from "./catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";
import { User } from "../models/User.js";

export const isAuthenticated = catchAsyncError(
    async (req, res, next) => {
        const { token } = req.cookies;//this is to get the token from the cookie, to acesss the cookie we need to install cookie parser and use in app.js

        if (!token) return next(new ErrorHandler("Please login to access this resource", 401));//401 is the status code for unauthorized

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded._id);
        next();
    }
)

export const authorizedAdmin = catchAsyncError(
    async (req, res, next) => {
        const { role } = req.user;

        if (role !== "admin") {
            return next(new ErrorHandler("You are not authorized to access this resource", 403));
        }
        next();
    }
)

export const authorizedSubscribers = catchAsyncError(
    async (req, res, next) => {
        const status = req.user.subscription.status;
        if (status !== "active" && req.user.role !== "admin") {
            return next(new ErrorHandler("You are not authorized to access this resource, Only subscribers can access this resource", 403));
        }
        next();
    }
)