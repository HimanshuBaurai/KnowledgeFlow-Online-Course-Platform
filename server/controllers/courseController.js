import { catchAsyncError } from '../middlewares/catchAsyncError.js';
import { Course } from '../models/Course.js';//import model
import getDataUri from '../utils/dataUri.js';
import ErrorHandler from '../utils/errorHandler.js';
import cloudinary from 'cloudinary';

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

        const file = req.file;//get file from req as blob, we want its uri
        const fileUri = getDataUri(file);//get uri of file

        const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);//upload file to cloudinary, and get its public id and url

        const course = await Course.create({
            title,
            description,
            category,
            createdBy,
            poster: {
                public_id: mycloud.public_id,//replace with cloudinary public id
                url: mycloud.secure_url,//replace with cloudinary url, that you  gget for a file you uploaded on cloudinary
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

//get course lectures
export const getCourseLectures = catchAsyncError(
    async (req, res, next) => {

        const course = await Course.findById(req.params.id);//find course by id

        if (!course) {
            return next(new ErrorHandler('Course not found', 404));
        }

        course.views += 1;//increment views by 1, as someone is viewing this course
        await course.save({ validateBeforeSave: false });//save course, we dont want to validate before save, as we are not updating any field, we are just incrementing views

        res.status(200).json({
            success: true,
            lectures: course.lectures
        }); //send response
    }
);

//add course lecture
export const addLecture = catchAsyncError(
    async (req, res, next) => {

        const course = await Course.findById(req.params.id);//find course by id
        if (!course) {
            return next(new ErrorHandler('Course not found', 404));
        }

        //upload file here to cloudinary, and get its public id and url, and then add it to lecture object

        const { title, description } = req.body;
        if (!title || !description) {
            return next(new ErrorHandler('Please fill all fields', 400));
        }

        // const file = req.file;//get file from req as blob, we want its uri

        const lecture = {
            title,
            description,
            video: {
                public_id: 'temp',//replace with cloudinary public id
                url: 'temp',//replace with cloudinary url, that you  gget for a file you uploaded on cloudinary
            }
        }

        course.lectures.push(lecture);//push lecture to lectures array


        course.numOfVideos = course.lectures.length;//increment numOfVideos by 1, as we added a new video
        await course.save({ validateBeforeSave: false });//save course, we dont want to validate before save, as we are not updating any field, we are just pushing a lecture to lectures array


        res.status(200).json({
            success: true,
            message: "lecture added successfully into course"
        }); //send response
    }
);