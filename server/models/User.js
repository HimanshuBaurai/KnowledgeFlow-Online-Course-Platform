import mongoose from "mongoose";
import validator from "validator";

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"],
    },
    email: {
        type: String,
        required: [true, "Please enter your email"],
        unique: true,
        validate: validator.isEmail,// checks if the email is valid
    },
    password: {
        type: String,
        required: [true, "Please enter your password"],
        minlength: [6, "Minimum password length is 6 characters"],
        select: false, // this will not return the password when we query for a user, to get the password we need to explicitly ask for it
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
    subscription: {
        id: String,
        status: String,
    },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    playlist: [
        {
            course: {
                type: mongoose.Schema.Types.ObjectId,// this is the id of the course, we will use this to populate the course
                ref: "Course"// this is the model name
            },
            poster: String,
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    ResetPasswordToken: String,
    ResetPasswordExpire: String,
});

export const User = mongoose.model("User", schema);