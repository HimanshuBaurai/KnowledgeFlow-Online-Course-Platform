import express from 'express';
import { addLecture, createCourse, deleteCourse, deleteLecture, getAllCourses, getCourseLectures } from '../controllers/courseController.js';
import singleUpload from '../middlewares/multer.js';
import { authorizedAdmin, authorizedSubscribers, isAuthenticated } from '../middlewares/auth.js';

const router = express.Router();


router.route('/courses').get(getAllCourses);//gget  all courses without  lectures
router.route('/createcourse').post(isAuthenticated, authorizedAdmin, singleUpload, createCourse);//create course- onlyy admin can create course

//add lecture, delete course, get course details
router.route('/course/:id')
    .get(isAuthenticated,authorizedSubscribers, getCourseLectures)
    .post(isAuthenticated, authorizedAdmin,singleUpload, addLecture)
    .delete(isAuthenticated,authorizedAdmin,deleteCourse);//only admin can add lectures

//delete lecture
router.route('/lecture').delete(isAuthenticated,authorizedAdmin,deleteLecture);//only admin can delete lecture, here courseId and lectureId will be sent as query params


export default router;