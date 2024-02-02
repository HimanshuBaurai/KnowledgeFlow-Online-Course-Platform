import express from 'express';
import { addToPlaylist, changePassword, deleteMyProfile, deleteUser, forgetPassword, getAllUsers, getMyProfile, login, logout, register, removeFromPlaylist, resetPassword, updateProfile, updateProfilePicture, updateUserRole } from '../controllers/userController.js';
import { authorizedAdmin, isAuthenticated } from '../middlewares/auth.js';
import singleUpload from '../middlewares/multer.js';

const router = express.Router();

//register
router.route('/register').post(singleUpload, register);
//login
router.route('/login').post(login);
//logout
router.route('/logout').get(logout);
//my profile
router.route('/me').get(isAuthenticated, getMyProfile);//isAuthenticated ensures that the user is logged in
//delete my profile
router.route('/me').delete(isAuthenticated, deleteMyProfile);//isAuthenticated ensures that the user is logged in
//change password
router.route('/changepassword').put(isAuthenticated, changePassword);//isAuthenticated ensures that the user is logged in
//update profile
router.route('/updateprofile').put(isAuthenticated, updateProfile);//isAuthenticated ensures that the user is logged in
//update profile pic
router.route('/updateprofilepic').put(isAuthenticated, singleUpload, updateProfilePicture);//isAuthenticated ensures that the user is logged in
//forget password
router.route('/forgetpassword').post(forgetPassword);
//reset password
router.route('/resetpassword/:token').put(resetPassword);
//add to playlist
router.route('/addtoplaylist').post(isAuthenticated, addToPlaylist);//isAuthenticated ensures that the user is logged in
//remove from playlist
router.route('/removefromplaylist').delete(isAuthenticated, removeFromPlaylist);//isAuthenticated ensures that the user is logged in

//admin routes
//get all users
router.route('/admin/users').get(isAuthenticated, authorizedAdmin, getAllUsers);//isAuthenticated ensures that the user is logged in, authorizedAdmin ensures that the user is admin
//updating role
router.route('/admin/user/:id')
    .put(isAuthenticated, authorizedAdmin, updateUserRole)
    .delete(isAuthenticated, authorizedAdmin, deleteUser);//isAuthenticated ensures that the user is logged in, authorizedAdmin ensures that the user is admin

export default router;