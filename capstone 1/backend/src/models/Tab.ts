import db from '../__utilities__/db'; // Adjust the import path according to your project structure
import { NotFoundError } from '../__utilities__/expressError';
import { TabProperties, TicketProperties } from '../__utilities__/modelInterfaces'; // Import interfaces from ObjectInterfaces
import { DatabaseObject } from './DatabaseObject'; // Import DatabaseObject from the same directory
import { Restaurant } from './Restaurant';
import { Ticket } from './Ticket';
import { TicketItem } from './TicketItem';


interface fullTicket extends TicketProperties {
    id: string,
    ticketItems: TicketItem[],
}

interface fullTab extends TabProperties {
    id: string,
    tickets: fullTicket[],
}


export class Tab extends DatabaseObject {

    static tableName = 'Tab';

    constructor(
        public customer_name: string,
        public server_restaurant_employee_id: string,
        public restaurant_table_id: string | null,
        public restaurant_id: string,
        public tab_status: string = 'open',
        public discount: number = 0,
        public calculated_tax: number | null = null,
        public total_tip: number | null = null,
        public id: string | undefined = undefined,
    ) {
        const properties: TabProperties = {
            id,
            customer_name,
            discount,
            calculated_tax,
            total_tip,
            tab_status,
            server_restaurant_employee_id,
            restaurant_table_id,
            restaurant_id,

        };
        super(properties);
    }

    static async getAllFullTabs(restaurant_id: string): Promise<fullTab[]> {
        try {
            // Retrieve restaurant by the restaurant_id
            const restaurant = await Restaurant.findById(restaurant_id) as Restaurant | null;
            if (restaurant === null) { throw new NotFoundError('Restaurant not found'); };

            // Retrieve all Section instances related to this menu
            const allTabs = await restaurant.getTabs();

            // Retrieve all Ticket instances for the Tabs
            const allTickets = await Ticket.getTicketsByTabIDs(
                allTabs.map((tab: Tab): string => {
                    return tab.id as string;
                })
            );

            // Retrieve all TicketItem instances for the Tickets
            const allTicketItems = await TicketItem.getTicketItemsByTicketIDs(
                allTickets.map((ticket: Ticket): string => {
                    if (ticket.id === undefined) { throw new Error(); }
                    return ticket.id;
                })
            );

            // Build the tabs structure by mapping over each Tab
            const tabs: fullTab[] = allTabs.map((tab: Tab) => {
                // Filter tickets for the current tab
                const ticketsFortab = allTickets.filter((ticket: Ticket) => ticket.tab_id === tab.id);

                // Build an array of tickets with their ticketItems
                const tickets: fullTicket[] = ticketsFortab.map((ticket: Ticket) => {
                    // Filter ticketItems for the current Ticket
                    const ticketItemsForTickets = allTicketItems.filter((ticketItem: TicketItem) => ticketItem.tab_id === tab.id);


                    const restaurantTicket: fullTicket = {
                        comments: ticket.comments,
                        tab_id: ticket.tab_id,
                        restaurant_id: ticket.restaurant_id,
                        status: ticket.status,
                        time_completed: ticket.time_completed,
                        id: ticket.id as string,
                        ticketItems: ticketItemsForTickets
                    };
                    return restaurantTicket;
                });

                // Return a structured object for each tab

                const restaurantTab: fullTab = {
                    customer_name: tab.customer_name as string,
                    discount: tab.discount,
                    calculated_tax: tab.calculated_tax,
                    total_tip: tab.total_tip,
                    tab_status: tab.tab_status,
                    server_restaurant_employee_id: tab.server_restaurant_employee_id,
                    restaurant_table_id: tab.restaurant_table_id,
                    restaurant_id: tab.restaurant_id,
                    id: tab.id as string,
                    tickets: tickets
                };

                return restaurantTab;
            });

            return tabs;
        } catch (err) {
            // Handle any errors that might occur during the process
            throw err;
        }
    };

    async getTickets(): Promise<Ticket[]> {
        try {
            // Query the Ticket table for tickets belonging to this Tab
            const res = await db.query('SELECT * FROM Tab WHERE tab_id = $1', [this.id]);

            // Map over the resulting rows and turn each one into a new Ticket instance
            const tabs: Ticket[] = res.rows.map((row: TicketProperties) => new Ticket(row.tab_id, row.restaurant_id, row.comments, row.status, row.time_completed, row.id,));
            return tabs;
        } catch (err) {
            throw err;
        };
    };

}

module.exports = {
    Tab
};