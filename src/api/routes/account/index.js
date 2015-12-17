import { Router } from 'express';

const accountRouter = new Router();

accountRouter.use('/test', (req, res) => {
  res.json({
    'test': 'worked',
  });
});
accountRouter.use('/', (req, res) => {
  res.json({
    'index': 'worked',
  });
});

export default accountRouter;
