import express from 'express';
import { authorizedAdmin, authorizedSubscribers, isAuthenticated } from '../middlewares/auth.js';
import { contact, courseRequest, getDashboardStats } from '../controllers/otherController.js';

const router = express.Router();


//contact form
router.route('/contact').post(contact);
//requestForm
router.route('/courserequest').post(isAuthenticated, courseRequest);
//get admin dashboard stats
router.route('/admin/stats').get(isAuthenticated, authorizedAdmin, getDashboardStats);


export default router;