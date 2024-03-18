import express, { Request, Response, NextFunction } from 'express';
import { InterfaceRequest } from '../../__utilities__/requestInterfaces';

import { ExpressError, NotFoundError, UnauthorizedError, BadRequestError, ForbiddenError } from '../../__utilities__/expressError';
import { Layout } from '../../models/Layout';
import { authenticateInterface } from '../../__utilities__/authenticateToken';
import { RestaurantInterface } from '../../models/RestaurantInterface';
import { Restaurant } from '../../models/Restaurant';
import { RestaurantTable } from '../../models/RestaurantTable';
import { Reservation } from '../../models/Reservation';
import { kitchenNsp } from '../../__utilities__/namespace';
import { Employee } from '../../models/Employee';
import { Shift } from '../../models/Shift';
import { TipPool } from '../../models/TipPool';
import { RestaurantEmployee } from '../../models/RestaurantEmployee';
import { Ticket } from '../../models/Ticket';
import { validateSchema } from '../../__utilities__/validateSchema';
import ticketSchema from './schemas/ticketSchema';

const router = express.Router();

router.use(express.json());


router.route('/ticket/:ticket_id/')
    .patch(authenticateInterface, validateSchema(ticketSchema), async (req: InterfaceRequest, res: Response, next: NextFunction) => {
        const restaurantInterface = req.restaurantInterface as RestaurantInterface;
        try {
            const { ticket_id } = req.params;
            const { status }: { status: string } = req.body;

            const ticket = await Ticket.findById(ticket_id) as Ticket | null;

            if (!ticket) { throw new NotFoundError('Shift not found') };

            if (!status) { throw new BadRequestError('Required data is missing or improperly formatted') };

            // Save the updated ticket back to the database
            if (status === 'completed') { ticket.time_completed = new Date(); };
            ticket.status = status;
            await ticket.save();


            kitchenNsp.to(restaurantInterface.restaurant_id as string).emit('update');

            return res.sendStatus(200);

        } catch (err) {
            kitchenNsp.to(restaurantInterface.restaurant_id as string).emit('update');
            next(err);
        };
    })

export default router;