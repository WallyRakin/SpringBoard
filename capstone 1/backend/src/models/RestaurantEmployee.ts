import db from '../__utilities__/db'; // Adjust the import path according to your project structure
import { RestaurantEmployeeProperties } from '../__utilities__/modelInterfaces'; // Import interfaces from ObjectInterfaces
import { DatabaseObject } from './DatabaseObject'; // Import DatabaseObject from the same directory
import crypto from 'crypto';

export class RestaurantEmployee extends DatabaseObject {

    static tableName = 'Restaurant_Employee';

    constructor(
        public employee_id: string,
        public restaurant_id: string,
        public employee_rank: string,
        public employee_code: string,
        public employment_status: string = "active",
        public id: string | undefined = undefined,
    ) {
        const properties: RestaurantEmployeeProperties = {
            id,
            employee_id,
            restaurant_id,
            employee_rank,
            employee_code,
            employment_status
        };
        super(properties);
    }

    static async findByPK(employee_id: string, restaurant_id: string): Promise<RestaurantEmployee | null> {
        try {
            const res = await db.query('SELECT * FROM Restaurant_Employee WHERE employee_id = $1 AND restaurant_id = $2', [employee_id, restaurant_id]);

            if (res.rows.length == 0) {
                return null;
            } else {
                const restaurantEmployee = new RestaurantEmployee(

                    res.rows[0].employee_id,
                    res.rows[0].restaurant_id,
                    res.rows[0].employee_rank,
                    res.rows[0].employee_code,
                    res.rows[0].employment_status,
                    res.rows[0].id,
                );

                return restaurantEmployee;
            };
        } catch (err) {
            throw err
        };
    };

    static async findByEmployeeCode(employee_code: string): Promise<RestaurantEmployee | null> {
        try {
            const res = await db.query('SELECT * FROM Restaurant_Employee WHERE employee_code = $1', [employee_code]);

            if (res.rows.length == 0) {
                return null;
            };

            const row: RestaurantEmployeeProperties = res.rows[0]

            const restaurantEmployee = new RestaurantEmployee(row.employee_id, row.restaurant_id, row.employee_rank, row.employee_code, row.employment_status, row.id,);

            return restaurantEmployee;
        } catch (err) {
            throw err
        };
    };

    static async validateNewEmployeeCode(employee_code: string, restaurant_id: string): Promise<boolean> {
        try {
            const res = await db.query('SELECT * FROM Restaurant_Employee WHERE employee_code = $1 AND restaurant_id = $2', [employee_code, restaurant_id]);

            if (res.rows.length == 0) {
                return true;
            } else {
                return false
            };
        } catch (err) {
            throw err
        };
    };

}

module.exports = {
    RestaurantEmployee
};
