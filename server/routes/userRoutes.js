import express from 'express';
import { getMyProfile, login, logout, register } from '../controllers/userController.js';
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

export default router;