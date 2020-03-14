import express from 'express';
import validate from 'express-validation';

const router = express.Router();

import validation from './validations';
import * as userCtrl from './controller/user';
import * as hobbyCtrl from './controller/hobby';

router.get('/status', (req, res) => res.send('OK'));

router
  .route('/users')
  .get(userCtrl.getList)
  .post(validate(validation.addUser), userCtrl.add);

router
  .route('/users/:id')
  .get(userCtrl.getSingle)
  .patch(validate(validation.addUser), userCtrl.update)
  .delete(userCtrl.remove);

router
  .route('/users/:id/hobbies')
  .get(hobbyCtrl.getList)
  .post(validate(validation.addHobby), hobbyCtrl.add);

router
  .route('/hobbies/:id')
  .get(hobbyCtrl.getSingle)
  .patch(validate(validation.updateHobby), hobbyCtrl.update)
  .delete(hobbyCtrl.remove);

export default router;
