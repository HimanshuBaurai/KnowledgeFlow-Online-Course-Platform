import { Course } from '../models/Course.js';//import model

//when we use async, its a good practice to use try catch block, but to use it everytime is not a good practice
//so we use a middleware to handle async errors and wrap our async functions in that middleware



//get all courses
export const getAllCourses = async (req, res, next) => {

    const courses = await Course.find();//find all courses in db

    res.status(200).json({
        success: true,
        courses
    }); //send response
};