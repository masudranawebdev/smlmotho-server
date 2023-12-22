import { Router } from 'express';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { UserRoutes } from '../modules/user/user.routers';
import { MobileRoutes } from '../modules/mobile/mobile.routes';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/mobiles',
    route: MobileRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
