import express from 'express';
import userRouter from './user.js';
import acctRouter from './account.js';

const router = express.Router();

router.use('/user', userRouter);
router.use('/account', acctRouter);

export default router;
