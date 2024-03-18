import { JSONSchemaType } from 'ajv';

interface schedule {
    monday_opening?: string | null;
    tuesday_opening?: string | null;
    wednesday_opening?: string | null;
    thursday_opening?: string | null;
    friday_opening?: string | null;
    saturday_opening?: string | null;
    sunday_opening?: string | null;
    monday_closing?: string | null;
    tuesday_closing?: string | null;
    wednesday_closing?: string | null;
    thursday_closing?: string | null;
    friday_closing?: string | null;
    saturday_closing?: string | null;
    sunday_closing?: string | null;
    time_zone: string;
    time_until_first_reservation_minutes: number;
    time_until_last_reservation_minutes: number;
    reservation_duration_minutes: number;
}

const scheduleSchema: JSONSchemaType<schedule> = {
    type: "object",
    properties: {
        monday_opening: { type: "string", nullable: true, pattern: "^[0-2][0-9]:[0-5][0-9]:[0-5][0-9]$", errorMessage: "Invalid time format. Expected format HH:MM:SS." },
        tuesday_opening: { type: "string", nullable: true, pattern: "^[0-2][0-9]:[0-5][0-9]:[0-5][0-9]$", errorMessage: "Invalid time format. Expected format HH:MM:SS." },
        wednesday_opening: { type: "string", nullable: true, pattern: "^[0-2][0-9]:[0-5][0-9]:[0-5][0-9]$", errorMessage: "Invalid time format. Expected format HH:MM:SS." },
        thursday_opening: { type: "string", nullable: true, pattern: "^[0-2][0-9]:[0-5][0-9]:[0-5][0-9]$", errorMessage: "Invalid time format. Expected format HH:MM:SS." },
        friday_opening: { type: "string", nullable: true, pattern: "^[0-2][0-9]:[0-5][0-9]:[0-5][0-9]$", errorMessage: "Invalid time format. Expected format HH:MM:SS." },
        saturday_opening: { type: "string", nullable: true, pattern: "^[0-2][0-9]:[0-5][0-9]:[0-5][0-9]$", errorMessage: "Invalid time format. Expected format HH:MM:SS." },
        sunday_opening: { type: "string", nullable: true, pattern: "^[0-2][0-9]:[0-5][0-9]:[0-5][0-9]$", errorMessage: "Invalid time format. Expected format HH:MM:SS." },
        monday_closing: { type: "string", nullable: true, pattern: "^[0-2][0-9]:[0-5][0-9]:[0-5][0-9]$", errorMessage: "Invalid time format. Expected format HH:MM:SS." },
        tuesday_closing: { type: "string", nullable: true, pattern: "^[0-2][0-9]:[0-5][0-9]:[0-5][0-9]$", errorMessage: "Invalid time format. Expected format HH:MM:SS." },
        wednesday_closing: { type: "string", nullable: true, pattern: "^[0-2][0-9]:[0-5][0-9]:[0-5][0-9]$", errorMessage: "Invalid time format. Expected format HH:MM:SS." },
        thursday_closing: { type: "string", nullable: true, pattern: "^[0-2][0-9]:[0-5][0-9]:[0-5][0-9]$", errorMessage: "Invalid time format. Expected format HH:MM:SS." },
        friday_closing: { type: "string", nullable: true, pattern: "^[0-2][0-9]:[0-5][0-9]:[0-5][0-9]$", errorMessage: "Invalid time format. Expected format HH:MM:SS." },
        saturday_closing: { type: "string", nullable: true, pattern: "^[0-2][0-9]:[0-5][0-9]:[0-5][0-9]$", errorMessage: "Invalid time format. Expected format HH:MM:SS." },
        sunday_closing: { type: "string", nullable: true, pattern: "^[0-2][0-9]:[0-5][0-9]:[0-5][0-9]$", errorMessage: "Invalid time format. Expected format HH:MM:SS." },
        time_zone: { type: "string" },
        time_until_first_reservation_minutes: { type: "number" },
        time_until_last_reservation_minutes: { type: "number" },
        reservation_duration_minutes: { type: "number" },
    },
    required: ["time_zone"],
    additionalProperties: false,
};


export default scheduleSchema;