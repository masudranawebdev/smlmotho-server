import { Router } from 'express';
import { UserController } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';

const router = Router();

router.get('/', UserController.getAllUser);
router.get('/count', UserController.countAllData);
router.get('/:id', UserController.getDataById);
router.post(
  '/signup',
  validateRequest(UserValidation.userZodSchema),
  UserController.signup
);

export const UserRoutes = router;
