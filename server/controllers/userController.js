import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { User } from "../models/User.js";
import ErrorHandler from "../utils/errorHandler.js";
import { sendEmail } from "../utils/sendEmail.js";
import { sendToken } from "../utils/sendToken.js";
import crypto from 'crypto';

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
        sendToken(res, `Welcome Back ${user.name}`, 200) //201 is the status code for created
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

export const changePassword = catchAsyncError(
    async (req, res, next) => {
        const { oldPassword, newPassword } = req.body;
        if (!oldPassword || !newPassword) {
            return next(new ErrorHandler("Please enter all fields", 400))
        }

        //we want it to be accessed by only who is already authenticated
        //thus we will utilize one more middleware isAuthenticated

        const user = await User.findById(req.user._id).select('+password')// req.user is set in the protect middleware

        if (!user) return next(new ErrorHandler("User not found", 404))// this is to check if the user exists or not

        const isMatch = await user.comparePassword(oldPassword);
        if (!isMatch) return next(new ErrorHandler("Incorrect password", 401))

        user.password = newPassword;
        await user.save();//no need to hash again as it is done in the pre save hook in the schema itself

        res.status(200).json({ success: true, message: "Password changed successfully" })

        // sendToken(res, user, "Password changed successfully", 200)
    }
)

export const updateProfile = catchAsyncError(
    async (req, res, next) => {
        const { name, email } = req.body;
        //we want it to be accessed by only who is already authenticated
        //thus we will utilize one more middleware isAuthenticated

        const user = await User.findById(req.user._id)// req.user is set in the protect middleware
        if (!user) return next(new ErrorHandler("User not found", 404))// this is to check if the user exists or not

        if (name) user.name = name;
        if (email) user.email = email;
        await user.save();

        res.status(200).json({ success: true, message: "Profile updated successfully" })

        // sendToken(res, user, "Password changed successfully", 200)
    }
)

export const updateProfilePicture = catchAsyncError(
    async (req, res, next) => {
        //cloudinary TODO



        // const { avatar } = req.body;
        // //we want it to be accessed by only who is already authenticated
        // //thus we will utilize one more middleware isAuthenticated

        // const user = await User.findById(req.user._id)// req.user is set in the protect middleware
        // if (!user) return next(new ErrorHandler("User not found", 404))// this is to check if the user exists or not

        // user.avatar=avatar;
        // await user.save();

        res.status(200).json({ success: true, message: "Profile picture updated successfully" })

        // sendToken(res, user, "Password changed successfully", 200)
    }
)

export const forgetPassword = catchAsyncError(
    async (req, res, next) => {
        const { email } = req.body;
        if (!email) {
            return next(new ErrorHandler("Please enter all fields", 400))
        }

        const user = await User.findOne({ email })

        if (!user) return next(new ErrorHandler("User not found", 404))// this is to check if the user exists or not

        const resetToken = await user.getResetPasswordToken();

        const url = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`;
        const message = `Click on the link to reset your password. ${url}. \n\nIf you have not requested this email, then ignore it.`;
        await sendEmail(user.email, `KnowledgeFlow Password Recovery`, message);


        await user.save({ validateBeforeSave: false }); // we are not validating the user before saving as we are not updating any field, we are just saving the token and expire time
        res.status(200).json({ success: true, message: "Email sent successfully" })
    }
)

export const resetPassword = catchAsyncError(
    async (req, res, next) => { 
        
        const { token } = req.params;
        const resetPasswordToken = crypto.createHash('sha256').update(token).digest('hex');
        const user = await User.findOne({ resetPasswordToken, resetPasswordExpire: { $gt: Date.now() } })// req.user is set in the protect middleware
        if (!user) return next(new ErrorHandler("Invalid token or token expired", 404))// this is to check if the user exists or not

        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save();
        
        res.status(200).json({ success: true, message: "Password updated successfully" })
    }
)