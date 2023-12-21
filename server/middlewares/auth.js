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