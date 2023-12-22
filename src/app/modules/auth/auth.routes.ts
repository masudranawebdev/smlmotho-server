import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthValidation } from './auth.validation';
import { AuthController } from './auth.controller';

const router = Router();

router.post(
  '/sign-in',
  validateRequest(AuthValidation.loginZodSchema),
  AuthController.loginUser
);

export const AuthRoutes = router;
