import { JSONSchemaType } from 'ajv';

interface Menu {
    menu_title: string;
    menu_section_title: string;
    position: number;
    menu_item_root_name: string;
    base_price: number;
    menu_item_root_description: string;
    prep_time_required: boolean;
    // new_menu_section_id: string;
    menu_item_variation_description: string;
    price_difference: number;
}

const menuSchema: JSONSchemaType<Menu> = {
    type: "object",
    properties: {
        menu_title: { type: "string" },
        menu_section_title: { type: "string" },
        position: { type: "number" },
        menu_item_root_name: { type: "string" },
        base_price: { type: "number" },
        menu_item_root_description: { type: "string" },
        prep_time_required: { type: "boolean" },
        new_menu_section_id: { type: "string" },
        menu_item_variation_description: { type: "string" },
        price_difference: { type: "number" },
    },
    required: [], // No properties are required, aligning with the condition that no parameters are required.
    additionalProperties: false, // Ensures that no properties other than those listed are allowed, aligning with the condition to not accept undefined properties.
};

export default menuSchema;
