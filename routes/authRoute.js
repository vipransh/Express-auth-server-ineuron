import express from 'express'
const authRouter=express.Router();

import { register, signIn } from '../controller/authController.js';


authRouter.route("/register").post(register);
authRouter.route("/login").post(signIn);

export default authRouter;