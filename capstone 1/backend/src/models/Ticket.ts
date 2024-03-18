import db from '../__utilities__/db'; // Adjust the import path according to your project structure
import { TicketItemProperties, TicketProperties } from '../__utilities__/modelInterfaces'; // Import interfaces from ObjectInterfaces
import { DatabaseObject } from './DatabaseObject'; // Import DatabaseObject from the same directory
import { TicketItem } from './TicketItem';

export class Ticket extends DatabaseObject {

    static tableName = 'Ticket';

    constructor(
        public tab_id: string,
        public restaurant_id: string,
        public comments: string,
        public status: string | null = null,
        public time_completed: Date | null = null,
        public id: string | undefined = undefined,
    ) {
        const properties: TicketProperties = {
            id,
            comments,
            restaurant_id,
            status,
            time_completed,
            tab_id,
        };
        super(properties);
    }

    static async getActiveTicketsByRestaurantID(Id: string): Promise<Ticket[]> {
        try {
            const res = await db.query(`SELECT * FROM Ticket WHERE restaurant_id = $1 AND status = 'in-progress'`, [Id]);
            const shifts: Ticket[] = res.rows.map((row: TicketProperties): Ticket => {
                return new Ticket(row.tab_id, row.restaurant_id, row.comments, row.status, row.time_completed, row.id,)
            })
            return shifts;
        } catch (err) {
            // Handle or throw error
            throw err;
        };
    };

    static async getTicketsByTabIDs(IdArray: string[]) {
        try {
            const res = await db.query(`SELECT * FROM Ticket WHERE tab_id = ANY($1)`, [IdArray]);

            const tables: Ticket[] = res.rows.map((row: TicketProperties) => { return new Ticket(row.tab_id, row.restaurant_id, row.comments, row.status, row.time_completed, row.id) })
            return tables;
        } catch (err) {
            // Handle or throw error
            throw err;
        };
    };

    async getTicketItems(): Promise<TicketItem[]> {
        try {
            // Query the TicketItem table for instances belonging to this Ticket
            const res = await db.query('SELECT * FROM Ticket_item WHERE ticket_id = $1', [this.id]);

            // Map over the resulting rows and turn each one into a new MenuSection instance
            const menuSections: TicketItem[] = res.rows.map((row: TicketItemProperties) => new TicketItem(row.menu_item_variation_id, row.ticket_id, row.tab_id, row.comments, row.prep_time_required, row.price_adjustment, row.id,));
            return menuSections;
        } catch (err) {
            throw err;
        };
    };
}

module.exports = {
    Ticket
};