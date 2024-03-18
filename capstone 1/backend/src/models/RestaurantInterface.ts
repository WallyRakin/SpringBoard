import db from '../__utilities__/db'; // Adjust the import path according to your project structure
import { RestaurantInterfaceProperties } from '../__utilities__/modelInterfaces'; // Import interfaces from ObjectInterfaces
import { DatabaseObject } from './DatabaseObject'; // Import DatabaseObject from the same directory
import { ExpressError, NotFoundError, UnauthorizedError, BadRequestError, ForbiddenError, } from '../__utilities__/expressError';
import jwt, { JwtPayload } from 'jsonwebtoken';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import { secretKey } from '../config';

export class RestaurantInterface extends DatabaseObject {

    static tableName = 'Restaurant_Interface';

    constructor(
        public restaurant_id: string,
        public tablemap_permission: boolean,
        public tab_permission: boolean,
        public kitchen_permission: boolean,
        public shift_permission: boolean,
        public time_created: Date = new Date(),
        public link_code: string | null = null,
        public interface_token: string | null = null,
        public id: string | undefined = undefined,
    ) {
        const properties: RestaurantInterfaceProperties = {
            id,
            restaurant_id,
            tablemap_permission,
            tab_permission,
            kitchen_permission,
            shift_permission,
            time_created,
            interface_token,
            link_code
        };
        super(properties);
    }

    static async findByLinkCode(employeeCode: string): Promise<RestaurantInterface | null> {
        try {
            const res = await db.query('SELECT * FROM Restaurant_Interface WHERE link_code = $1', [employeeCode]);

            if (res.rows.length == 0) {
                return null;
            };

            const employee = new RestaurantInterface(
                res.row[0].restaurant_id,
                res.row[0].time_created,
                res.row[0].link_code,
                res.row[0].interface_token,
                res.row[0].id,
            );

            return employee;
        } catch (err) {
            throw err
        };
    };

    static async authorize(token: string): Promise<{ user: RestaurantInterface }> {
        try {
            const decoded = jwt.verify(token, secretKey);

            // Check if decoded is an object and has the 'id' and 'col' properties
            if (!(typeof decoded === 'object' && decoded !== null && 'id' in decoded && 'col' in decoded)) {
                throw new UnauthorizedError('Invalid token');
            }
            const user = await RestaurantInterface.findById(decoded.id) as RestaurantInterface | null;
            if (user === null) {
                throw new UnauthorizedError('Invalid or expired token');
            }
            if (token !== user.interface_token) {
                throw new UnauthorizedError('Invalid token');
            }

            return { user };

        } catch (err) {
            throw err;
        }
    }

    async _setToken(): Promise<string> {
        // Generate an authentication token
        const token = jwt.sign({
            id: this.id,
            tablemap_permission: this.tablemap_permission,
            tab_permission: this.tab_permission,
            kitchen_permission: this.kitchen_permission,
            shift_permission: this.shift_permission,
            iat: Math.floor(Date.now() / 1000),
            code: crypto.randomBytes(16).toString('hex'),
        }, secretKey);


        // Hash the authentication token and save the hashed token to the database
        const token_hash = await bcrypt.hash(token, 3);
        this.interface_token = token_hash;
        await this.save();

        return token;
    };

}

module.exports = {
    RestaurantInterface
};