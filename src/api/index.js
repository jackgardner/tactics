/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import { Router } from 'express';
import accountRouter from './routes/account';

const router = new Router();

router.use('/account', accountRouter);


export default router;
