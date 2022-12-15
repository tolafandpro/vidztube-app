import  express  from 'express';
import { signUp, signIn, googleAuth } from '../controllers/authController.js'; 


const router = express.Router();

//Creat a user
router.post("/signup", signUp)

//Sign IN 
router.post("/signin", signIn)

//Google Auth
router.post("/google", googleAuth)

export default router;