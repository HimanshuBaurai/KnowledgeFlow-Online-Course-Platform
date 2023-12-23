import express from 'express';
import { addLecture, createCourse, getAllCourses, getCourseLectures } from '../controllers/courseController.js';
import singleUpload from '../middlewares/multer.js';

const router = express.Router();


router.route('/courses').get(getAllCourses);//gget  all courses without  lectures
router.route('/createcourse').post(singleUpload, createCourse);//create course- onlyy admin can create course

//add lecture, delete course, get course details
router.route('/course/:id')
    .get(getCourseLectures)
    .put(singleUpload, addLecture);
//delete lecture


export default router;