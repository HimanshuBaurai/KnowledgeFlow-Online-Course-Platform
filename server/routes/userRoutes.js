import express from 'express';
import { changePassword, forgetPassword, getMyProfile, login, logout, register, resetPassword, updateProfile, updateProfilePicture } from '../controllers/userController.js';
import { isAuthenticated } from '../middlewares/auth.js';

const router = express.Router();

//register
router.route('/register').post(register);
//login
router.route('/login').post(login);
//logout
router.route('/logout').get(logout);
//my profile
router.route('/me').get(isAuthenticated, getMyProfile);//isAuthenticated ensures that the user is logged in
//change password
router.route('/changepassword').put(isAuthenticated, changePassword);//isAuthenticated ensures that the user is logged in
//update profile
router.route('/updateprofile').put(isAuthenticated, updateProfile);//isAuthenticated ensures that the user is logged in
//update profile pic
router.route('/updateprofilepic').put(isAuthenticated, updateProfilePicture);//isAuthenticated ensures that the user is logged in
//forget password
router.route('/forgetpassword').post(forgetPassword);
//reset password
router.route('/resetpassword/:token').put(resetPassword);

export default router;