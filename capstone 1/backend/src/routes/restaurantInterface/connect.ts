import express, { Request, Response, NextFunction } from 'express';
import { InterfaceRequest } from '../../__utilities__/requestInterfaces';

import { ExpressError, NotFoundError, UnauthorizedError, BadRequestError, ForbiddenError } from '../../__utilities__/expressError';
import { RestaurantInterface } from '../../models/RestaurantInterface';
import { authenticateInterface } from '../../__utilities__/authenticateToken';
import { validateSchema } from '../../__utilities__/validateSchema';
import connectSchema from './schemas/connectSchema';

const router = express.Router();

router.use(express.json());


router.route('/link')
    .get(authenticateInterface, async (req: InterfaceRequest, res: Response, next: NextFunction) => {
        try {
            const restaurantInterface = req.restaurantInterface as RestaurantInterface;
            restaurantInterface.shift_permission;

            res.status(200).json({ tablemap_permission: restaurantInterface.tablemap_permission, tab_permission: restaurantInterface.tab_permission, kitchen_permission: restaurantInterface.kitchen_permission, shift_permission: restaurantInterface.shift_permission });
        } catch (err) {
            next(err);
        };
    })
    .post(validateSchema(connectSchema), async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { link_code }: { link_code: string } = req.body;

            const restaurantInterface = await RestaurantInterface.findByLinkCode(link_code);
            if (restaurantInterface === null) { throw new NotFoundError('Code is invalid') };
            const token = restaurantInterface._setToken();

            res.status(200).json({ token });

        } catch (err) {
            next(err);
        };
    })

export default router;