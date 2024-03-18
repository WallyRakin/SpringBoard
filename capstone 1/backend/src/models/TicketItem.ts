import db from '../__utilities__/db'; // Adjust the import path according to your project structure
import { TicketItemProperties } from '../__utilities__/modelInterfaces'; // Import interfaces from ObjectInterfaces
import { DatabaseObject } from './DatabaseObject'; // Import DatabaseObject from the same directory

export class TicketItem extends DatabaseObject {

    static tableName = 'Ticket_item';

    constructor(
        public menu_item_variation_id: string,
        public ticket_id: string,
        public tab_id: string,
        public comments: string,
        public prep_time_required: boolean,
        public price_adjustment: number = 0,
        public id: string | undefined = undefined,
    ) {
        const properties: TicketItemProperties = {
            id,
            comments,
            price_adjustment,
            prep_time_required,
            ticket_id,
            menu_item_variation_id,
            tab_id
        };
        super(properties);
    };

    static async getTicketItemsByTicketIDs(IdArray: string[]): Promise<TicketItem[]> {
        try {
            const res = await db.query(`SELECT * FROM Ticket_item WHERE ticket_id = ANY($1)`, [IdArray]);
            const ticketItems: TicketItem[] = res.rows.map((row: TicketItemProperties): TicketItem => {
                return new TicketItem(row.menu_item_variation_id, row.ticket_id, row.tab_id, row.comments, row.prep_time_required, row.price_adjustment, row.id,)
            })
            return ticketItems;
        } catch (err) {
            // Handle or throw error
            throw err;
        };
    };
};

module.exports = {
    TicketItem
};