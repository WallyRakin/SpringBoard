import { JSONSchemaType } from 'ajv';

export interface Table {
    table_name: string;
    table_status: string;
    table_type: string;
    seats: number;
    x: number;
    y: number;
}

const tableSchema: JSONSchemaType<Table> = {
    type: "object",
    properties: {
        table_name: { type: "string" },
        table_status: { type: "string" },
        table_type: { type: "string" },
        seats: { type: "number" },
        x: { type: "number" },
        y: { type: "number" },
    },
    required: [],
    additionalProperties: false,
};

export default tableSchema;