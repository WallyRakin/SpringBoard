import express, { Request, Response, NextFunction } from 'express';
import { InterfaceRequest } from '../../__utilities__/requestInterfaces';

import { ExpressError, NotFoundError, UnauthorizedError, BadRequestError, ForbiddenError } from '../../__utilities__/expressError';
import { Layout } from '../../models/Layout';
import { authenticateInterface } from '../../__utilities__/authenticateToken';
import { RestaurantInterface } from '../../models/RestaurantInterface';
import { Restaurant } from '../../models/Restaurant';
import { RestaurantTable } from '../../models/RestaurantTable';
import { Reservation } from '../../models/Reservation';
import { tabNsp } from '../../__utilities__/namespace';
import { Employee } from '../../models/Employee';
import { Shift } from '../../models/Shift';
import { TipPool } from '../../models/TipPool';
import { RestaurantEmployee } from '../../models/RestaurantEmployee';
import { Tab } from '../../models/Tab';
import { Ticket } from '../../models/Ticket';
import { TicketItem } from '../../models/TicketItem';
import { MenuItemVariation } from '../../models/MenuItemVariation';
import { MenuItemRoot } from '../../models/MenuItemRoot';
import { validateSchema } from '../../__utilities__/validateSchema';
import tabSchema from './schemas/tabSchema';
import ticketSchema from './schemas/ticketSchema';
import ticketItemSchema from './schemas/tichetItemSchema';

const router = express.Router();

router.use(express.json());

router.route('/tab/')
    .post(authenticateInterface, validateSchema(tabSchema), async (req: InterfaceRequest, res: Response, next: NextFunction) => {
        const restaurantInterface = req.restaurantInterface as RestaurantInterface;
        try {
            const { customer_name, employee_code, restaurant_table_id }: { customer_name: string, employee_code: string, restaurant_table_id: string | null } = req.body;

            const restaurant = await Restaurant.findById(restaurantInterface.restaurant_id) as Restaurant | null;
            if (restaurant === null) { throw new UnauthorizedError() };

            const activeShifts = await Shift.getActiveShiftsByRestaurantID(restaurant.id as string);
            const ActiveRestaurantEmployeeIds = activeShifts.map((shift: Shift) => { return shift.restaurant_employee_id });

            const restaurantEmployee = await RestaurantEmployee.findByEmployeeCode(employee_code);
            if (restaurantEmployee === null) { throw new NotFoundError('Invalid Employee code') };
            if (restaurantEmployee.employee_rank !== 'admin' || !ActiveRestaurantEmployeeIds.includes(restaurantEmployee.id as string)) { throw new UnauthorizedError('Employee must be have an active shift to be assigned to tabs') };


            if (!customer_name || !employee_code || !restaurant_table_id) {
                throw new BadRequestError("Required parameters are missing.");
            };

            const tab = new Tab(customer_name, restaurantEmployee.id as string, restaurant_table_id, restaurant.id as string);
            await tab.save();


            tabNsp.to(restaurantInterface.restaurant_id as string).emit('update');

            return res.sendStatus(201);

        } catch (err) {
            tabNsp.to(restaurantInterface.restaurant_id as string).emit('update');
            next(err);
        };
    });


router.route('/tab/:tab_id/')
    .delete(authenticateInterface, async (req: InterfaceRequest, res: Response, next: NextFunction) => {
        const restaurantInterface = req.restaurantInterface as RestaurantInterface;
        try {
            const { tab_id } = req.params;

            const restaurant = await Restaurant.findById(restaurantInterface.restaurant_id) as Restaurant | null;
            if (restaurant === null) { throw new UnauthorizedError() };

            const tab = await Tab.findById(tab_id) as Tab | null;
            if (tab === null) { throw new NotFoundError('Tab not found') };

            const ticketsForTab = await tab.getTickets();

            ticketsForTab.forEach((ticket: Ticket) => { if (ticket.status !== null) { throw new ForbiddenError('Cannot delete tab if they have active tickets ') } });

            await tab.delete();

            tabNsp.to(restaurantInterface.restaurant_id as string).emit('update');

            return res.sendStatus(200);

        } catch (err) {
            tabNsp.to(restaurantInterface.restaurant_id as string).emit('update');
            next(err);
        };
    })


router.route('/tab/:tab_id/ticket/')
    .post(authenticateInterface, validateSchema(ticketSchema), async (req: InterfaceRequest, res: Response, next: NextFunction) => {
        const restaurantInterface = req.restaurantInterface as RestaurantInterface;
        try {
            const { tab_id } = req.params;
            const { comments }: { comments: string } = req.body;

            const restaurant = await Restaurant.findById(restaurantInterface.restaurant_id) as Restaurant | null;
            if (restaurant === null) { throw new UnauthorizedError() };

            const tab = await Tab.findById(tab_id) as Tab | null;
            if (tab === null) { throw new NotFoundError('Tab not found') };

            if (!comments) {
                throw new BadRequestError("Required parameters are missing.");
            };


            const ticket = new Ticket(tab.id as string, restaurant.id as string, comments);
            await ticket.save();


            tabNsp.to(restaurantInterface.restaurant_id as string).emit('update');

            return res.sendStatus(200);

        } catch (err) {
            tabNsp.to(restaurantInterface.restaurant_id as string).emit('update');
            next(err);
        };
    });

router.route('/tab/:tab_id/ticket/:ticket_id/')
    .patch(authenticateInterface, validateSchema(ticketSchema), async (req: InterfaceRequest, res: Response, next: NextFunction) => {
        const restaurantInterface = req.restaurantInterface as RestaurantInterface;
        const { tab_id, ticket_id } = req.params;
        let { status }: { status: string } = req.body;
        try {
            const restaurant = await Restaurant.findById(restaurantInterface.restaurant_id) as Restaurant | null;
            if (restaurant === null) { throw new UnauthorizedError() };

            const tab = await Tab.findById(tab_id) as Tab | null;
            if (tab === null) { throw new BadRequestError('Route is not properly formatted') };

            const ticket = await Ticket.findById(ticket_id) as Ticket | null;
            if (ticket === null) { throw new NotFoundError('Ticket not found') };

            if (!status) {
                throw new BadRequestError("Required parameters are missing.");
            };

            if (status === 'in-progress') {
                const ticketItems = await ticket.getTicketItems();
                const prepRequired = ticketItems.map((ticketItem: TicketItem) => {
                    return ticketItem.prep_time_required;
                });
                if (!prepRequired.includes(true)) { status = 'complete' };
            };

            ticket.status = status;
            await ticket.save();


            tabNsp.to(restaurantInterface.restaurant_id as string).emit('update');

            return res.sendStatus(200);

        } catch (err) {
            tabNsp.to(restaurantInterface.restaurant_id as string).emit('update');
            next(err);
        };
    })
    .delete(authenticateInterface, async (req: InterfaceRequest, res: Response, next: NextFunction) => {
        const restaurantInterface = req.restaurantInterface as RestaurantInterface;
        try {
            const { tab_id, ticket_id } = req.params;

            const restaurant = await Restaurant.findById(restaurantInterface.restaurant_id) as Restaurant | null;
            if (restaurant === null) { throw new UnauthorizedError() };

            const tab = await Tab.findById(tab_id) as Tab | null;
            if (tab === null) { throw new BadRequestError('Route is not properly formatted') };

            const ticket = await Ticket.findById(ticket_id);
            if (ticket === null) { throw new NotFoundError('Ticket not found') };
            await ticket.delete();


            tabNsp.to(restaurantInterface.restaurant_id as string).emit('update');

            return res.sendStatus(200);

        } catch (err) {
            tabNsp.to(restaurantInterface.restaurant_id as string).emit('update');
            next(err);
        };
    });

router.route('/tab/:tab_id/ticket/:ticket_id/item/')
    .post(authenticateInterface, validateSchema(ticketItemSchema), async (req: InterfaceRequest, res: Response, next: NextFunction) => {
        const restaurantInterface = req.restaurantInterface as RestaurantInterface;
        try {
            const { tab_id, ticket_id } = req.params;
            const { menu_item_variation_id, comments }: { comments: string, menu_item_variation_id: string } = req.body;

            const restaurant = await Restaurant.findById(restaurantInterface.restaurant_id) as Restaurant | null;
            if (restaurant === null) { throw new UnauthorizedError() };


            const tab = await Tab.findById(tab_id) as Tab | null;
            if (tab === null) { throw new BadRequestError('Route is not properly formatted') };

            const ticket = await Ticket.findById(ticket_id);
            if (ticket === null) { throw new BadRequestError('Route is not properly formatted') };

            const menuItem = await MenuItemVariation.findById(menu_item_variation_id) as MenuItemVariation | null;
            if (menuItem === null) { throw new NotFoundError('Menu Item not found') };

            const menuItemRoot = await MenuItemRoot.findById(menu_item_variation_id) as MenuItemRoot | null;
            if (menuItemRoot === null) { throw new ExpressError('Unexecpted error has occurred', 500) };

            if (!menu_item_variation_id || !comments) {
                throw new BadRequestError("Required parameters are missing.");
            };

            const item = new TicketItem(menuItem.id as string, ticket.id as string, tab.id as string, comments, menuItemRoot.prep_time_required);
            await item.save();

            tabNsp.to(restaurantInterface.restaurant_id as string).emit('update');

            return res.sendStatus(201);

        } catch (err) {
            tabNsp.to(restaurantInterface.restaurant_id as string).emit('update');
            next(err);
        };
    });

router.route('/tab/:tab_id/ticket/:ticket_id/item/:item_id')
    .patch(authenticateInterface, validateSchema(ticketItemSchema), async (req: InterfaceRequest, res: Response, next: NextFunction) => {
        const restaurantInterface = req.restaurantInterface as RestaurantInterface;
        try {
            const { tab_id, ticket_id, item_id } = req.params;
            const { employee_code, price_adjustment }: { employee_code: string, price_adjustment: number } = req.body;

            const restaurant = await Restaurant.findById(restaurantInterface.restaurant_id) as Restaurant | null;
            if (restaurant === null) { throw new UnauthorizedError() };


            const tab = await Tab.findById(tab_id) as Tab | null;
            if (tab === null) { throw new BadRequestError('Route is not properly formatted') };

            const ticket = await Ticket.findById(ticket_id);
            if (ticket === null) { throw new BadRequestError('Route is not properly formatted') };

            const item = await TicketItem.findById(item_id) as TicketItem | null;
            if (item === null) { throw new NotFoundError('Ticket Item not found') };

            const restaurantEmployee = await RestaurantEmployee.findByEmployeeCode(employee_code);
            if (restaurantEmployee === null) { throw new UnauthorizedError('Invalid employee code') };
            if (
                restaurantEmployee.employee_rank !== 'admin' &&
                restaurantEmployee.employee_rank !== 'manager'
            ) { throw new UnauthorizedError('Employee does not have authorization for this action') };

            if (!employee_code || !price_adjustment) {
                throw new BadRequestError("Required parameters are missing.");
            };

            item.price_adjustment = price_adjustment;
            await item.save();

            tabNsp.to(restaurantInterface.restaurant_id as string).emit('update');

            return res.sendStatus(200);

        } catch (err) {
            tabNsp.to(restaurantInterface.restaurant_id as string).emit('update');
            next(err);
        };
    })
    .delete(authenticateInterface, validateSchema(ticketItemSchema), async (req: InterfaceRequest, res: Response, next: NextFunction) => {
        const restaurantInterface = req.restaurantInterface as RestaurantInterface;
        try {
            const { tab_id, ticket_id, item_id } = req.params;
            const { employee_code }: { employee_code: string, price_adjustment: number } = req.body;

            const restaurant = await Restaurant.findById(restaurantInterface.restaurant_id) as Restaurant | null;
            if (restaurant === null) { throw new UnauthorizedError() };


            const tab = await Tab.findById(tab_id) as Tab | null;
            if (tab === null) { throw new BadRequestError('Route is not properly formatted') };

            const ticket = await Ticket.findById(ticket_id) as Ticket | null;
            if (ticket === null) { throw new BadRequestError('Route is not properly formatted') };

            const item = await TicketItem.findById(item_id) as TicketItem | null;
            if (item === null) { throw new NotFoundError('Ticket Item not found') };


            if (!employee_code) {
                throw new BadRequestError("Required parameters are missing.");
            };

            const restaurantEmployee = await RestaurantEmployee.findByEmployeeCode(employee_code);
            if (restaurantEmployee === null) { throw new UnauthorizedError('Invalid employee code') };

            if (ticket.status !== null) {
                if (
                    restaurantEmployee.employee_rank !== 'admin' &&
                    restaurantEmployee.employee_rank !== 'manager'
                ) { throw new UnauthorizedError('Employee does not have authorization for this action') };
            };

            if (!employee_code) {
                throw new BadRequestError("Required parameters are missing.");
            };

            await item.delete();

            tabNsp.to(restaurantInterface.restaurant_id as string).emit('update');

            return res.sendStatus(200);

        } catch (err) {
            tabNsp.to(restaurantInterface.restaurant_id as string).emit('update');
            next(err);
        };
    });

export default router;