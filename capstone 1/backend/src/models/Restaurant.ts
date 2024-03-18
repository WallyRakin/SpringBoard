import db from '../__utilities__/db'; // Adjust the import path according to your project structure
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UnauthorizedError, NotFoundError } from '../__utilities__/expressError';
import { RestaurantProperties, MenuProperties, LayoutProperties, RestaurantInterfaceProperties, TabProperties } from '../__utilities__/modelInterfaces'; // Import interfaces from ObjectInterfaces
import { DatabaseObject } from './DatabaseObject'; // Import DatabaseObject from the same directory
import { Menu } from './Menu'; // Import Menu from the same directory
import crypto from 'crypto';
import { Layout } from './Layout';

import { secretKey } from '../config'; // Replace with your actual encryption key, preferably stored in an environment variable
import { RestaurantInterface } from './RestaurantInterface';
import { Tab } from './Tab';

export class Restaurant extends DatabaseObject {

    static tableName = 'Restaurant';


    constructor(
        public restaurant_name: string,
        public restaurant_address: string,
        public email: string,
        public phone_number: string,
        public password_hash: string,
        public id: string | undefined = undefined,
        public active_layout_id: string | null = null,
        public auth_token_hash: string | null = null,
        public time_zone: string | null = null,
        public time_until_first_reservation_minutes: number = 0,
        public time_until_last_reservation_minutes: number = 0,
        public reservation_duration_minutes: number = 0,
        public monday_opening: string | null = null,
        public tuesday_opening: string | null = null,
        public wednesday_opening: string | null = null,
        public thursday_opening: string | null = null,
        public friday_opening: string | null = null,
        public saturday_opening: string | null = null,
        public sunday_opening: string | null = null,
        public monday_closing: string | null = null,
        public tuesday_closing: string | null = null,
        public wednesday_closing: string | null = null,
        public thursday_closing: string | null = null,
        public friday_closing: string | null = null,
        public saturday_closing: string | null = null,
        public sunday_closing: string | null = null,
    ) {
        const properties: RestaurantProperties = {
            id,
            restaurant_name,
            restaurant_address,
            email,
            phone_number,
            active_layout_id,
            password_hash,
            auth_token_hash,
            time_zone,
            time_until_first_reservation_minutes,
            time_until_last_reservation_minutes,
            reservation_duration_minutes,
            monday_opening,
            tuesday_opening,
            wednesday_opening,
            thursday_opening,
            friday_opening,
            saturday_opening,
            sunday_opening,
            monday_closing,
            tuesday_closing,
            wednesday_closing,
            thursday_closing,
            friday_closing,
            saturday_closing,
            sunday_closing,
        };

        super(properties);
    };

    // static getTablenName(): string {
    //     return this.tableName;
    // };

    static async authorize(token: string): Promise<Restaurant> {
        try {
            const decoded = jwt.verify(token, secretKey);

            // Check if decoded is an object and has an 'id' property
            if (!(typeof decoded === 'object' && decoded !== null && 'id' in decoded)) {
                throw new UnauthorizedError('Invalid token');
            }
            const user = await Restaurant.findById(decoded.id) as Restaurant;
            if (!user) {
                throw new UnauthorizedError();
            }
            if (!user.auth_token_hash) {
                throw new UnauthorizedError();
            }
            const matchStore = await bcrypt.compare(token, user.auth_token_hash);
            if (!matchStore) {
                throw new UnauthorizedError();
            }

            return user;

        } catch (err) {
            throw err;
        };
    };

    static async findByEmail(email: string): Promise<Restaurant> {
        try {
            const res = await db.query('SELECT * FROM Restaurants WHERE email = $1', [email]);

            if (res.rows.length == 0) {
                const err = new NotFoundError()
                throw err;
            };

            const row: RestaurantProperties = res.row[0]

            const restaurant = new Restaurant(
                row.restaurant_name,
                row.restaurant_address,
                row.email,
                row.phone_number,
                row.password_hash,
                row.id,
                row.active_layout_id,
                row.auth_token_hash,
                row.time_zone,
                row.time_until_first_reservation_minutes,
                row.time_until_last_reservation_minutes,
                row.reservation_duration_minutes,
                row.monday_opening,
                row.tuesday_opening,
                row.wednesday_opening,
                row.thursday_opening,
                row.friday_opening,
                row.saturday_opening,
                row.sunday_opening,
                row.monday_closing,
                row.tuesday_closing,
                row.wednesday_closing,
                row.thursday_closing,
                row.friday_closing,
                row.saturday_closing,
                row.sunday_closing
            );

            return restaurant
        } catch (err) {
            throw err
        };
    };

    async authenticate(password: string) {
        try {
            const isValid = await bcrypt.compare(password, this.password_hash);

            if (!isValid) {
                const err = new UnauthorizedError('Invalid password');
                throw err;
            };

            const token = this._setToken();

            return token;

        } catch (err) {
            throw err;
        };
    };

    async getRestaurantInterfaces(): Promise<RestaurantInterface[]> {
        try {
            // Query the MenuSection table for menuSection belonging to this Menu
            const res = await db.query('SELECT * FROM Restaurant_Interface WHERE menu_id = $1', [this.id]);

            // Map over the resulting rows and turn each one into a new MenuSection instance
            const RestaurantInterfaces: RestaurantInterface[] = res.rows.map((row: RestaurantInterfaceProperties) => new RestaurantInterface(this.id as string, row.tablemap_permission, row.tab_permission, row.kitchen_permission, row.shift_permission,));
            return RestaurantInterfaces;
        } catch (err) {
            throw err;
        };
    };

    async getMenus(): Promise<Menu[]> {
        try {
            // Query the Menu table for menus belonging to this restaurant
            const res = await db.query('SELECT * FROM Menu WHERE restaurant_id = $1', [this.id]);

            // Map over the resulting rows and turn each one into a new Menu instance
            const menus = res.rows.map((row: MenuProperties) => {
                // Extract the necessary properties from the row
                const { id, menu_title, restaurant_id } = row;
                return new Menu(menu_title, restaurant_id, id);
            });
            return menus;
        } catch (err) {
            throw err;
        }
    };

    async getLayouts(): Promise<Layout[]> {
        try {
            // Query the Layout table for layouts belonging to this restaurant
            const res = await db.query('SELECT * FROM Layout WHERE restaurant_id = $1', [this.id]);

            // Map over the resulting rows and turn each one into a new Layout instance
            const layouts: Layout[] = res.rows.map((row: LayoutProperties) => {
                // Extract the necessary properties from the row
                const { id, layout_name, restaurant_id } = row;
                return new Layout(layout_name, restaurant_id, id);
            });
            return layouts;
        } catch (err) {
            throw err;
        }
    };

    async getTabs(): Promise<Tab[]> {
        try {
            // Query the Tab table for tabs belonging to this restaurant
            const res = await db.query("SELECT * FROM Tab WHERE restaurant_id = $1 AND tab_status = 'open'", [this.id]);

            // Map over the resulting rows and turn each one into a new Tab instance
            const tabs: Tab[] = res.rows.map((row: TabProperties) => {
                return new Tab(row.customer_name, row.server_restaurant_employee_id, row.restaurant_table_id, row.restaurant_id, row.tab_status, row.discount, row.calculated_tax, row.total_tip, row.id,);
            });
            return tabs;
        } catch (err) {
            throw err;
        }
    };

    async _setToken() {
        // Generate an authentication token
        const token = jwt.sign({
            id: this.id,
            iat: Math.floor(Date.now() / 1000),
            code: crypto.randomBytes(16).toString('hex'),
        }, secretKey);


        // Hash the authentication token and save the hashed token to the database
        const token_hash = await bcrypt.hash(token, 3);
        this.auth_token_hash = token_hash;
        await this.save();

        return token;
    };

};

module.exports = {
    Restaurant // The class definition will be added by you
};
