import express from 'express';
import { isAuthenticated } from '../middlewares/auth.js';
import { buySubscription, cancelSubscription, getRazorPayKey, paymentVerification } from '../controllers/paymentController.js';


const router = express.Router();

// Buy subscription
router.route('/subscribe').get(isAuthenticated, buySubscription);//isAuthenticated ensures that the user is logged in
router.route('/paymentverification').post(isAuthenticated, paymentVerification);//verify payment and save reference in db
router.route('/razorpaykey').get(getRazorPayKey);//get razorpay key
router.route('/subscribe/cancel').delete(isAuthenticated, cancelSubscription);//cancel subscription

export default router;