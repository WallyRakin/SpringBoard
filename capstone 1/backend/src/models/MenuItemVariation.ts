import db from '../__utilities__/db'; // Adjust the import path according to your project structure
import { MenuItemVariationProperties, MenuItemRootProperties } from '../__utilities__/modelInterfaces'; // Import interfaces from ObjectInterfaces
import { DatabaseObject } from './DatabaseObject'; // Import DatabaseObject from the same directory
import { MenuItemRoot } from './MenuItemRoot'; // Import MenuItemRoot from the same directory

export class MenuItemVariation extends DatabaseObject {

    static tableName = 'Menu_item_variation';

    constructor(
        public menu_item_root_id: string,
        public menu_item_variation_description: string,
        public price_difference: number,
        public id: string | undefined = undefined,
    ) {
        const properties: MenuItemVariationProperties = {
            id,
            menu_item_root_id,
            menu_item_variation_description,
            price_difference
        };
        super(properties);
    };

    static async getVariationsByItemRootID(IdArray: string[]) {
        try {
            const res = await db.query(`SELECT * FROM Menu_item_variation WHERE menu_item_root_id = ANY($1)`, [IdArray]);
            if (res.rows.length) {
                const menuItemRoots = res.rows.map((row: MenuItemRootProperties) => {
                    return new MenuItemRoot(row.menu_section_id, row.position, row.menu_item_root_name, row.base_price, row.menu_item_root_description, row.prep_time_required, row.id)
                })
                return menuItemRoots;
            } else {
                return null; // Or however you wish to handle not finding the entry
            }
        } catch (err) {
            // Handle or throw error
            throw err;
        };
    };

    static async findByPK(menu_item_root_id: string, menu_item_variation_description: string) {
        try {
            const res = await db.query(`SELECT * FROM Menu_item_variation WHERE menu_item_root_id = $1 AND menu_item_variation_description = $2`, [menu_item_root_id, menu_item_variation_description]);
            if (res.rows.length) {
                const row = res.rows[0];
                return new MenuItemVariation(row.id, row.menu_item_root_id, row.menu_item_variation_description, row.price_difference);
            } else {
                return null; // Or however you wish to handle not finding the entry
            }
        } catch (err) {
            // Handle or throw error
            throw err;
        };
    };

    async save() {
        if (this.id) {
            const reference = await MenuItemVariation.findById(this.id);
            if (!reference) { throw new Error('Unexpected Error') };
            if (reference.menu_item_variation_description == 'No change') {
                throw new Error('Method Not Allowed');
            };
        };
        super.save();
    };

    async delete() {
        if (this.id) {
            const reference = await MenuItemVariation.findById(this.id);
            if (!reference) { throw new Error('Unexpected Error') };
            if (reference.menu_item_variation_description == 'No change') {
                throw new Error('Method Not Allowed');
            };
        };
        super.delete();
    };

};

module.exports = {
    MenuItemVariation
};