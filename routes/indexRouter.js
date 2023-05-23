import express from 'express'
const indexRouter=express.Router();

import authRouter from './authRoute.js';

indexRouter.use("/",authRouter);

export default indexRouter;