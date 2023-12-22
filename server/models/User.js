import mongoose from "mongoose";
import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import crypto from "crypto";

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"],
    },
    email: {
        type: String,
        required: [true, "Please enter your email"],
        unique: true,
        validate: validator.isEmail,
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
    resetPasswordToken: String,
    resetPasswordExpire: String,
});

schema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }// if the password is not modified, then we don't need to hash it again

    this.password = await bcrypt.hash(this.password, 10);
});

schema.methods.getJWTToken = function () {
    return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
        expiresIn: "15d",
    });
};

schema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

schema.methods.getResetPasswordToken = function () {
    // const resetToken = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    //     expiresIn: "15m",
    // });
    // this.ResetPasswordToken = resetToken;
    // this.ResetPasswordExpire = Date.now() + 15 * 60 * 1000;
    
    const resetToken = crypto.randomBytes(20).toString("hex");
    this.resetPasswordToken=crypto.createHash("sha256").update(resetToken).digest("hex");
    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

    return resetToken;
}

export const User = mongoose.model("User", schema);