import express from 'express';
import { userLogin, userSignup } from '../controllers/userController.js';
import {getProperties} from '../controllers/bookingControllers.js'

const router = express.Router();

router.post('/sign-up',userSignup)
router.post('/log-in',userLogin)
router.get('/location',getProperties)




export default router;