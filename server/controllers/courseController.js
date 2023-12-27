import { catchAsyncError } from '../middlewares/catchAsyncError.js';
import { Course } from '../models/Course.js';//import model
import { Stats } from '../models/Stats.js';
import getDataUri from '../utils/dataUri.js';
import ErrorHandler from '../utils/errorHandler.js';
import cloudinary from 'cloudinary';

//when we use async, its a good practice to use try catch block, but to use it everytime is not a good practice
//so we use a middleware to handle async errors and wrap our async functions in that middleware



//get all courses
export const getAllCourses = catchAsyncError(
    async (req, res, next) => {

        //we will be passing keyword and category in query params, so we will get them from req.query
        const keyword = req.query.keyword || "";//if keyword is not present in query params, then we will set it to empty string
        const category = req.query.category || "";//if category is not present in query params, then we will set it to empty string

        const courses = await Course.find({
            title: {
                $regex: keyword,//find all courses in db, whose title contains keyword
                $options: "i" //case insensitive
            },
            category: {
                $regex: category,//find all courses in db, whose category contains category
                $options: "i" //case insensitive
            }
        }).select("-lectures");//find all courses in db, excluding lectures, as we dont want to send lectures data to client, we would only be showing it to the premium memmbers

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

//add course lecture, max video size 100mb, as using cloudinary free plan
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
        const file = req.file;//get file from req as blob, we want its uri
        const fileUri = getDataUri(file);//get uri of file
        const mycloud = await cloudinary.v2.uploader.upload(fileUri.content, { resource_type: "video" });//upload file to cloudinary, and get its public id and url

        const lecture = {
            title,
            description,
            video: {
                public_id: mycloud.public_id,//replace with cloudinary public id
                url: mycloud.secure_url,//replace with cloudinary url, that you  gget for a file you uploaded on cloudinary
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

//delete course
export const deleteCourse = catchAsyncError(
    async (req, res, next) => {

        const course = await Course.findById(req.params.id);//find course by id
        if (!course) {
            return next(new ErrorHandler('Course not found', 404));
        }

        await cloudinary.v2.uploader.destroy(course.poster.public_id);//delete poster from cloudinary
        for (let i = 0; i < course.lectures.length; i++) {
            await cloudinary.v2.uploader.destroy(course.lectures[i].video.public_id, { resource_type: "video" });//delete all videos from cloudinary
        }

        await course.deleteOne();//delete course from db

        res.status(200).json({
            success: true,
            message: "course deleted successfully"
        }); //send response
    }
);

//delete lecture
export const deleteLecture = catchAsyncError(
    async (req, res, next) => {
        const { courseId, lectureId } = req.query;//get courseId and lectureId from query params

        const course = await Course.findById(courseId);//find course by id
        if (!course) {
            return next(new ErrorHandler('Course not found', 404));
        }

        const lecture = course.lectures.find(lecture => lecture._id.toString() === lectureId);//find lecture by id
        if (!lecture) {
            return next(new ErrorHandler('Lecture not found', 404));
        }

        await cloudinary.v2.uploader.destroy(lecture.video.public_id, { resource_type: "video" });//delete video from cloudinary

        course.lectures = course.lectures.filter(lecture => lecture._id.toString() !== lectureId.toString());//remove lecture from lectures array
        course.numOfVideos = course.lectures.length;//decrement numOfVideos by 1, as we deleted a video
        await course.save({ validateBeforeSave: false });//save course, we dont want to validate before save, as we are not updating any field, we are just pushing a lecture to lectures array

        res.status(200).json({
            success: true,
            message: "lecture deleted successfully"
        }); //send response
    }
);

Course.watch().on('change', async () => {
    const stats = await Stats.find({}).sort({ createdAt: "desc" }).limit(1); // we will get the last 1 stats

    const courses = await Course.find();//find all courses in db
    let totalViews = 0;
    for (let i = 0; i < courses.length; i++) {
        totalViews += courses[i].views;
    }

    stats[0].views = totalViews;
    stats[0].createdAt = new Date(Date.now());
    await stats[0].save({ validateBeforeSave: false });//save stats, we dont want to validate before save, as we are not updating any field, we are just incrementing views
});