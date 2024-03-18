import db from '../__utilities__/db'; // Adjust the import path according to your project structure
import { RestaurantTableProperties, SectionProperties } from '../__utilities__/modelInterfaces'; // Import interfaces from ObjectInterfaces
import { DatabaseObject } from './DatabaseObject'; // Import DatabaseObject from the same directory
import { RestaurantTable } from './RestaurantTable'; // Import RestaurantTable from the same directory
import format from 'pg-format';

export class Section extends DatabaseObject {

    static tableName = 'Section';

    constructor(
        public section_name: string,
        public width: number,
        public height: number,
        public position: number,
        public layout_id: string,
        public id: string | undefined = undefined,
    ) {
        const properties: SectionProperties = {
            id,
            section_name,
            width,
            height,
            position,
            layout_id
        };
        super(properties);
    }

    async getTablesInDimensions(width: number = 1, height: number = 1): Promise<RestaurantTable[]> {
        if (!this.id) {
            throw new Error('Instance must have an id to perform this query');
        }

        try {
            const query = 'SELECT * FROM Restaurant_table WHERE section_id = $1 AND (x <= $2 OR y <= $3)'
            const res = await db.query(query, [this.id, width - 1, height - 1]);
            const restaurantTables = res.rows.map((row: RestaurantTableProperties) => {
                return new RestaurantTable(row.table_name, row.table_status, row.reservable, row.seats, row.x, row.y, row.section_id, row.id,)
            })
            return restaurantTables;
        } catch (err) {
            throw err;
        }
    }

}

module.exports = {
    Section
};
