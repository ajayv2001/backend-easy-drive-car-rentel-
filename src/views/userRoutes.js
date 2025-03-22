import express from 'express';
import { userLogin, userSignup } from '../controllers/userController.js';
import {getProperties} from '../controllers/bookingControllers.js'
import { createCheckoutSession } from '../controllers/paymentControllers.js';

const router = express.Router();

router.post('/sign-up',userSignup)
router.post('/log-in',userLogin)
router.get('/location',getProperties)
router.post("/create-checkout-session", createCheckoutSession);




export default router;