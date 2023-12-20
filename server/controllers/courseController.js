import { catchAsyncError } from '../middlewares/catchAsyncError.js';
import { Course } from '../models/Course.js';//import model
import ErrorHandler from '../utils/errorHandler.js';

//when we use async, its a good practice to use try catch block, but to use it everytime is not a good practice
//so we use a middleware to handle async errors and wrap our async functions in that middleware



//get all courses
export const getAllCourses = catchAsyncError(
    async (req, res, next) => {

        const courses = await Course.find().select("-lectures");//find all courses in db, excluding lectures, as we dont want to send lectures data to client, we would only be showing it to the premium memmbers

        res.status(200).json({
            success: true,
            courses
        }); //send response
    }
);

//create a course
export const createCourse = catchAsyncError(
    async (req, res, next) => {

        const { title, description, category, createdBy } = req.body;

        if (!title || !description || !category || !createdBy) {
            return next(new ErrorHandler('Please fill all fields', 400));
        }

        // const file = req.file;//get file from req as blob, we want its uri

        const course = await Course.create({
            title,
            description,
            category,
            createdBy,
            poster: {
                public_id: 'temp',//replace with cloudinary public id
                url: 'temp',//replace with cloudinary url, that you  gget for a file you uploaded on cloudinary
            }
            //createdAt,views,numnOfVideoes etc values will be set by default, and lectures array would be empty as we have not pushed anything, we just created a course
        });//create a course in db

        res.status(201).json({
            success: true,
            course,
            message: "course created successfully, you can now add lectures to it"
        }); //send response
    }
);