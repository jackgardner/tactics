/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import fs from 'fs';
import { join } from 'path';
import { Router } from 'express';
import Promise from 'bluebird';
import jade from 'jade';
import fm from 'front-matter';
import accountRouter from './routes/account';

const router = new Router();

router.use('/account', accountRouter);


export default router;
