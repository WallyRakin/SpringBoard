import express from 'express';
import authRoutes from './auth';
import layoutRoutes from './layout';
import menuRoutes from './menu';
import scheduleRoutes from './schedule';


const router = express.Router();

router.use('/', authRoutes);
router.use('/', layoutRoutes);
router.use('/', menuRoutes);
router.use('/', scheduleRoutes);

export default router;