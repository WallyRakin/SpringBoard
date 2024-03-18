import express from 'express';
import cors from 'cors';


import tabRoutes from './tab_refresh';
import tablemapRoutes from './tablemap_refresh';
import shiftRoutes from './shift_refresh';
import kitchenViewRoutes from './kitchenView_refresh';

import tabIORoutes from './tab';
import tablemapIORoutes from './tablemap';
import shiftIORoutes from './shift';
import kitchenViewIORoutes from './kitchenView';

const router = express.Router();

router.use('/', tabRoutes);
router.use('/', tablemapRoutes);
router.use('/', shiftRoutes);
router.use('/', kitchenViewRoutes);

router.use(cors());

router.use('/', tabIORoutes);
router.use('/', tablemapIORoutes);
router.use('/', shiftIORoutes);
router.use('/', kitchenViewIORoutes);

export default router;