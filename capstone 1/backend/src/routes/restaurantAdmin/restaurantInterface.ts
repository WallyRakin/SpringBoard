import express, { Request, Response, NextFunction } from 'express';
import { AdminRequest } from '../../__utilities__/requestInterfaces';

import { ExpressError, NotFoundError, UnauthorizedError, BadRequestError, ForbiddenError } from '../../__utilities__/expressError';
import { authenticateAdmin } from '../../__utilities__/authenticateToken';
import crypto from 'crypto';
import { Menu } from '../../models/Menu';
import { RestaurantInterface } from '../../models/RestaurantInterface';
import { validateSchema } from '../../__utilities__/validateSchema';
import restautantInterfaceSchema from './schemas/restaurantInterfaceSchema';

const router = express.Router();

router.use(express.json());


router.route('/interface')
    .get(authenticateAdmin, async (req: AdminRequest, res: Response, next: NextFunction) => {
        try {
            const { restaurant } = req;
            if (restaurant === undefined) { throw new UnauthorizedError() };

            const restaurantInterfaces = await restaurant.getRestaurantInterfaces();

            res.status(200).json({ restaurantInterfaces });
        } catch (err) {
            next(err);
        };
    })
    .post(authenticateAdmin, validateSchema(restautantInterfaceSchema), async (req: AdminRequest, res: Response, next: NextFunction) => {
        const { tablemap_permission, tab_permission, kitchen_permission, shift_permission }:
            { tablemap_permission: boolean, tab_permission: boolean, kitchen_permission: boolean, shift_permission: boolean } = req.body;

        try {
            const { restaurant } = req;
            if (restaurant === undefined) { throw new UnauthorizedError() };

            const restaurantInterface = new RestaurantInterface(restaurant.id as string, tablemap_permission || false, tab_permission || false, kitchen_permission || false, shift_permission || false);
            await restaurantInterface.save();

            res.status(201).json({ restaurantInterface });
        } catch (err) {
            next(err);
        };
    });


// Define the type for the updates
interface RestaurantInterfaceUpdates {
    [key: string]: boolean | undefined;
    tablemap_permission?: boolean;
    tab_permission?: boolean;
    kitchen_permission?: boolean;
    shift_permission?: boolean;
}
router.route('/interface/:interface_id')
    .post(authenticateAdmin, async (req: AdminRequest, res: Response, next: NextFunction) => {
        const { interface_id } = req.params;

        try {
            const { restaurant } = req;
            if (restaurant === undefined) { throw new UnauthorizedError() };


            const restaurantInterface = await RestaurantInterface.findById(interface_id) as RestaurantInterface;
            if (restaurantInterface === null) { throw new NotFoundError('Restaurant Interface not found') };

            let code: string;
            while (true) {
                code = crypto.randomBytes(6).toString('hex');
                const oldI = await RestaurantInterface.findByLinkCode(code);
                if (oldI === null) { break };
            };
            restaurantInterface.link_code = code;
            restaurantInterface.save();

            res.status(200).json({ restaurantInterface });
        } catch (err) {
            next(err);
        };
    })
    .patch(authenticateAdmin, validateSchema(restautantInterfaceSchema), async (req: AdminRequest, res: Response, next: NextFunction) => {
        const { interface_id } = req.params;
        // Destructure all possible parameters
        const { tablemap_permission, tab_permission, kitchen_permission, shift_permission }:
            { tablemap_permission: boolean | undefined, tab_permission: boolean | undefined, kitchen_permission: boolean | undefined, shift_permission: boolean | undefined } = req.body;

        // Prepare the updates object
        const updates: RestaurantInterfaceUpdates = {
            ...(tablemap_permission !== undefined && { tablemap_permission }),
            ...(tab_permission !== undefined && { tab_permission }),
            ...(kitchen_permission !== undefined && { kitchen_permission }),
            ...(shift_permission !== undefined && { shift_permission }),
        };

        try {
            const { restaurant } = req;
            if (restaurant === undefined) { throw new UnauthorizedError() };


            const restaurantInterface = await RestaurantInterface.findById(interface_id) as RestaurantInterface;
            if (restaurantInterface === null) { throw new NotFoundError('Restaurant Interface not found') };


            // Update the restaurant instance with new values
            Object.keys(updates).forEach(key => {
                restaurantInterface[key] = updates[key];
            });

            // Save the updated restaurant back to the database

            await restaurantInterface.save();

            res.status(200).json({ restaurantInterface });
        } catch (err) {
            next(err);
        };

    })
    .delete(authenticateAdmin, async (req: AdminRequest, res: Response, next: NextFunction) => {
        const { interface_id } = req.params;

        try {
            const { restaurant } = req;
            if (restaurant === undefined) { throw new UnauthorizedError() };


            const restaurantInterface = await RestaurantInterface.findById(interface_id) as RestaurantInterface;
            if (restaurantInterface === null) { throw new NotFoundError('Restaurant Interface not found') };

            await restaurantInterface.delete();

            res.status(204);
        } catch (err) {
            next(err);
        };

    })