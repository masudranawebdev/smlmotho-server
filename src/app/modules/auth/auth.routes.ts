import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthValidation } from './auth.validation';
import { AuthController } from './auth.controller';

const router = Router();

router.patch(
  '/change-password/:userId',
  validateRequest(AuthValidation.changePasswordZodSchema),
  AuthController.changePassword
);

router.post(
  '/login',
  validateRequest(AuthValidation.loginZodSchema),
  AuthController.loginUser
);

router.post(
  '/refesh_token',
  validateRequest(AuthValidation.refeshTokenZodSchema),
  AuthController.refeshToken
);

export const AuthRoutes = router;
