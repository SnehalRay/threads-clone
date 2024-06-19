import express from 'express'
import { signupUser } from '../controller/userController.js'


const router = express.Router();

//SIGN UP

router.post("/signup",signupUser)

export default router;