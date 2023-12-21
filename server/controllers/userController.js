import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { User } from "../models/User.js";
import ErrorHandler from "../utils/errorHandler.js";
import { sendToken } from "../utils/sendToken.js";

export const register = catchAsyncError(
    async (req, res, next) => {
        const { name, email, password } = req.body;
        //const file=req.file

        if (!name || !email || !password) {
            return next(new ErrorHandler("please enter all fields", 400))
        }

        let user = await User.findOne({ email })
        if (user) {
            return next(new ErrorHandler("user already exists", 409))
        }
        else {
            //upload file on cloudinary
            //const result=await cloudinary.v2.uploader.upload(file.path,{
            //    folder:'avatars',
            //    width:150,
            //    crop:'scale'
            //})

            user = await User.create({
                name,
                email,
                password,
                avatar: {
                    public_id: 'temp',
                    url: 'temp url'
                }
            })
        }

        //res.status(200).cookie('token',token,{ expires: new Date(Date.now() + 30*24*60*60*1000),httpOnly:true}).json({ success: true, token, user })
        //would be used several times, thus we would be making a function for this in utils folder
        sendToken(res, user, "successfully registered", 201) //201 is the status code for created
    }
)


export const login = catchAsyncError(
    async (req, res, next) => {
        const { email, password } = req.body;
        //const file=req.file

        if (!email || !password) {
            return next(new ErrorHandler("please enter all fields", 400))
        }

        const user = await User.findOne({ email }).select('+password');

        if (!user) return next(new ErrorHandler("Incorrect email or password", 401))

        const isMatch = await user.comparePassword(password);
        if (!isMatch) return next(new ErrorHandler("Incorrect email or password", 401))

        //res.status(200).cookie('token',token,{ expires: new Date(Date.now() + 30*24*60*60*1000),httpOnly:true}).json({ success: true, token, user })
        //would be used several times, thus we would be making a function for this in utils folder
        sendToken(res, user, `Welcome Back ${user.name}`, 200) //201 is the status code for created
    }
)


export const logout = catchAsyncError(
    async (req, res, next) => {
        res.status(200).cookie('token', null, { expires: new Date(Date.now()) }).json({ success: true, message: "logged out" })
    }
)


export const getMyProfile = catchAsyncError(
    async (req, res, next) => {
        //we want it to be accessed by only who is already authenticated
        //thus we will utilize one more middleware isAuthenticated
        const user = await User.findById(req.user._id)// req.user is set in the protect middleware

        if (!user) return next(new ErrorHandler("User not found", 404))// this is to check if the user exists or not

        res.status(200).json({ success: true, user })
    }
)
