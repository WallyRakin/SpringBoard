import express, { Request, Response, NextFunction } from 'express';

import restaurantAdminRouter from './routes/restaurantAdmin/_router';
import restaurantStaffRouter from './routes/restaurantStaff/_router';
import restaurantInterfaceRouter from './routes/restaurantInterface/_router';
import restaurantGuestRouter from './routes/restaurantGuest/_router';
import { ExpressError } from './__utilities__/expressError';

export const app = express();


app.use('/Admin', restaurantAdminRouter);
app.use('/Staff', restaurantStaffRouter);
app.use('/Interface', restaurantInterfaceRouter);
app.use('/Guest', restaurantGuestRouter);


app.use((err: ExpressError, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.status ? err.status : 500;

    // Construct the error response object manually
    const errorResponse: { status: number, message: string, data?: object } = {
        status: statusCode,
        message: err.message,
        // Include other properties if needed
    };

    if (err.data) {
        errorResponse.data = err.data; // Optionally include additional data if present
    }

    return res.status(statusCode).json({ error: errorResponse });
});


module.exports = { app };