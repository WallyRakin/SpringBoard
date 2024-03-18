import db from '../__utilities__/db'; // Adjust the import path according to your project structure
import { ShiftProperties } from '../__utilities__/modelInterfaces'; // Import interfaces from ObjectInterfaces
import { DatabaseObject } from './DatabaseObject'; // Import DatabaseObject from the same directory

export class Shift extends DatabaseObject {

    static tableName = 'Shift';

    constructor(
        public start_date_time: Date,
        public restaurant_id: string,
        public tip_pool_id: string,
        public restaurant_employee_id: string,
        public end_date_time: Date | null = null,
        public exit_code: string | null = null,
        public id: string | undefined = undefined,
    ) {
        const properties: ShiftProperties = {
            id,
            start_date_time,
            end_date_time,
            exit_code,
            restaurant_id,
            tip_pool_id,
            restaurant_employee_id,
        };
        super(properties);
    }

    static async getActiveShiftsByRestaurantID(restaurant_id: string): Promise<Shift[]> {
        try {
            const res = await db.query(`SELECT * FROM Shift WHERE restaurant_id = $1 AND end_date_time IS NULL`, [restaurant_id]);
            const shifts: Shift[] = res.rows.map((row: ShiftProperties): Shift => {
                return new Shift(row.start_date_time, row.restaurant_id, row.tip_pool_id, row.restaurant_employee_id, row.end_date_time, row.exit_code, row.id,)
            })
            return shifts;
        } catch (err) {
            // Handle or throw error
            throw err;
        };
    };

}

module.exports = {
    Shift
};