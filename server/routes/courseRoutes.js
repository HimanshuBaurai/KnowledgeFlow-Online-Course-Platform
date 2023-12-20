import express from 'express';
import { createCourse, getAllCourses } from '../controllers/courseController.js';

const router = express.Router();


router.route('/courses').get(getAllCourses);//gget  all courses without  lectures
router.route('/createcourse').post(createCourse);//create course- onlyy admin can create course
//add lecture, delete course, get course details
//delete lecture


export default router;