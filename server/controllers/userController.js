import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { Course } from "../models/Course.js";
import { User } from "../models/User.js";
import getDataUri from "../utils/dataUri.js";
import ErrorHandler from "../utils/errorHandler.js";
import { sendEmail } from "../utils/sendEmail.js";
import { sendToken } from "../utils/sendToken.js";
import crypto from 'crypto';
import cloudinary from 'cloudinary';
import { Stats } from "../models/Stats.js";


//register user => /api/v1/register
export const register = catchAsyncError(
    async (req, res, next) => {
        const { name, email, password } = req.body;
        const file = req.file//for avatar image

        if (!name || !email || !password || !file) {
            return next(new ErrorHandler("please enter all fields", 400))
        }

        const fileUri = getDataUri(file)
        const mycloud = await cloudinary.v2.uploader.upload(fileUri.content)

        let user = await User.findOne({ email })
        if (user) {
            return next(new ErrorHandler("user already exists", 409))
        }
        else {
            user = await User.create({
                name,
                email,
                password,
                avatar: {
                    public_id: mycloud.public_id,
                    url: mycloud.secure_url
                }
            })
        }

        //res.status(200).cookie('token',token,{ expires: new Date(Date.now() + 30*24*60*60*1000),httpOnly:true}).json({ success: true, token, user })
        //would be used several times, thus we would be making a function for this in utils folder
        sendToken(res, user, "successfully registered", 201) //201 is the status code for created
    }
)

//login user => /api/v1/login
export const login = catchAsyncError(
    async (req, res, next) => {
        const { email, password } = req.body;

        if (!email || !password) {
            return next(new ErrorHandler("please enter all fields", 400))
        }

        const user = await User.findOne({ email }).select('+password');

        if (!user) return next(new ErrorHandler("Incorrect email or password", 401))

        const isMatch = await user.comparePassword(password);
        if (!isMatch) return next(new ErrorHandler("Incorrect email or password", 401))

        //would be used several times, thus we would be making a function for this in utils folder
        sendToken(res, user, `Welcome Back ${user.name}`, 200) //201 is the status code for created
    }
)

//logout user => /api/v1/logout
export const logout = catchAsyncError(
    async (req, res, next) => {
        const options = {
            expires: new Date(Date.now()),// this is to set the expiry date of the cookie
            httpOnly: true,// this is to prevent cross site scripting attacks
            secure: true,//  this is to allow https only
            sameSite: "none",// this is to allow cross site cookies in production
        };
        res.status(200).cookie('token', null, options).json({ success: true, message: "logged out" })
    }
)

//get currently logged in user details => /api/v1/me
export const getMyProfile = catchAsyncError(
    async (req, res, next) => {
        //we want it to be accessed by only who is already authenticated
        //thus we will utilize one more middleware isAuthenticated
        const user = await User.findById(req.user._id)// req.user is set in the protect middleware

        if (!user) return next(new ErrorHandler("User not found", 404))// this is to check if the user exists or not

        res.status(200).json({ success: true, user })
    }
)
//delete my profile
export const deleteMyProfile = catchAsyncError(
    async (req, res, next) => {
        const user = await User.findById(req.user._id);
        if (!user) return next(new ErrorHandler("User not found", 404))// this is to check if the user exists or not

        await cloudinary.v2.uploader.destroy(user.avatar.public_id);
        //cancel subscriptions TODO
        await user.deleteOne();

        res.status(200).cookie("token", null, {
            expires: new Date(Date.now()),
        }).json({ success: true, message: "User deleted successfully" })
    }
)

//update password => /api/v1/password/update
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


//update profile 
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
    }
)

//update profile picture  
export const updateProfilePicture = catchAsyncError(
    async (req, res, next) => {
        //cloudinary TODO
        const user = await User.findById(req.user._id)// req.user is set in the protect middleware
        const file = req.file//for avatar image
        const fileUri = getDataUri(file)
        const mycloud = await cloudinary.v2.uploader.upload(fileUri.content)

        //delete previous image from cloudinary
        await cloudinary.v2.uploader.destroy(user.avatar.public_id);

        user.avatar = {
            public_id: mycloud.public_id,
            url: mycloud.secure_url
        }

        await user.save();

        res.status(200).json({ success: true, message: "Profile picture updated successfully" })
    }
)

//forgot password
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

//reset password
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

//add to playlist
export const addToPlaylist = catchAsyncError(
    async (req, res, next) => {
        //we want it to be accessed by only who is already authenticated
        //thus we will utilize one more middleware isAuthenticated

        const user = await User.findById(req.user._id)// req.user is set in the protect middleware
        if (!user) return next(new ErrorHandler("User not found", 404))// this is to check if the user exists or not

        const course = await Course.findById(req.body.id);
        if (!course) return next(new ErrorHandler("Course not found", 404))// this is to check if the course exists or not

        const isPresent = user.playlist.find((item) => item.course.toString() === course._id.toString());
        if (isPresent) return next(new ErrorHandler("Course already present in playlist", 409))

        user.playlist.push({ course: course._id, poster: course.poster.url });
        await user.save();

        res.status(200).json({ success: true, message: "Course added to playlist successfully" })
    }
)

//remove from playlist
export const removeFromPlaylist = catchAsyncError(
    async (req, res, next) => {
        //we want it to be accessed by only who is already authenticated
        //thus we will utilize one more middleware isAuthenticated

        const user = await User.findById(req.user._id)// req.user is set in the protect middleware
        if (!user) return next(new ErrorHandler("User not found", 404))// this is to check if the user exists or not

        const course = await Course.findById(req.query.id);//better approach rather than sending id in body as it is a delete request
        if (!course) return next(new ErrorHandler("Course not found", 404))// this is to check if the course exists or not

        const isPresent = user.playlist.find((item) => item.course.toString() === course._id.toString());
        if (!isPresent) return next(new ErrorHandler("Course not present in playlist", 404))

        user.playlist = user.playlist.filter((item) => item.course.toString() !== course._id.toString());
        await user.save();

        res.status(200).json({ success: true, message: "Course removed from playlist successfully" })
    }
)

//admin controllers
//get all users
export const getAllUsers = catchAsyncError(
    async (req, res, next) => {
        const users = await User.find();
        res.status(200).json({ success: true, users })
    }
)
//update user role
export const updateUserRole = catchAsyncError(
    async (req, res, next) => {
        const user = await User.findById(req.params.id);
        if (!user) return next(new ErrorHandler("User not found", 404))// this is to check if the user exists or not

        if (user.role === "admin") user.role = "user";
        else user.role = "admin";

        await user.save();

        res.status(200).json({ success: true, message: "User role updated successfully" })
    }
)
//delete user
export const deleteUser = catchAsyncError(
    async (req, res, next) => {
        const user = await User.findById(req.params.id);
        if (!user) return next(new ErrorHandler("User not found", 404))// this is to check if the user exists or not

        await cloudinary.v2.uploader.destroy(user.avatar.public_id);
        //cancel subscriptions TODO
        await user.deleteOne();

        res.status(200).json({ success: true, message: "User deleted successfully" })
    }
)

//watcher, whenever user updated/changed, this function will run, it is predefined in mongoose
User.watch().on('change', async (data) => {
    const stats = await Stats.find().sort({ createdAt: "desc" }).limit(1);

    const subscription = await User.find({ "subscription.status": "active" });
    stats[0].subscription = subscription.length;
    stats[0].users = await User.countDocuments();
    stats[0].createdAt = Date.now();
    // stats[0].views , will be made to be updated in course constrollers, as views increases when someone watches a course

    await stats[0].save();//we are saving the stats in db
}) 
