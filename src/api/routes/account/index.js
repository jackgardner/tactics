import { Router } from 'express';

const accountRouter = new Router();

accountRouter.use('/test', (req, res, next) => {
  res.json({'test': 'worked'});
});
accountRouter.use('/', (req, res, next) => {
  res.json({'index': 'worked'});
});



export default accountRouter;
