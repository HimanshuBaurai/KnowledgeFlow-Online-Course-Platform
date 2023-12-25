import express from 'express';
import { isAuthenticated } from '../middlewares/auth.js';
import { buySubscription } from '../controllers/paymentController.js';


const router = express.Router();

// Buy subscription
router.route('/subscribe').get(isAuthenticated, buySubscription);//isAuthenticated ensures that the user is logged in

export default router;