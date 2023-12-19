import mongoose from "mongoose";

const schema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please enter course title"],
        minLength: [4, "Minimum course title length is 4 characters"],
        maxLength: [80, "Maximum course title length is 80 characters"],
    },

    description: {
        type: String,
        required: [true, "Please enter course description"],
        maxLength: [2000, "Maximum course description length is 2000 characters"],
    },

    lectures: [
        {
            title: {
                type: String,
                required: true,
            },
            description: {
                type: String,
                required: true,
            },
            video: {
                public_id: {
                    type: String,
                    required: true
                },
                url: {
                    type: String,
                    required: true
                }
            }
        }
    ],

    poster: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },

    views: {
        type: Number,
        default: 0
    },

    numOfVideos: {
        type: Number,
        default: 0
    },

    category: {
        type: String,
        required: true,
    },

    createdBy: {
        // type: mongoose.Schema.Types.ObjectId,
        // ref: "User"
        type: String,
        required: [true, "Please enter course creator"],
    },

    createdAt: {
        type: Date,
        default: Date.now
    },
 
});

export const Course = mongoose.model("Course", schema);