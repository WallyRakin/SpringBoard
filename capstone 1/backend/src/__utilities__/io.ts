import { Server, Socket } from 'socket.io';
import { server } from './server';
import jwt from 'jsonwebtoken';
import { secretKey } from '../config';

import { ExpressError, NotFoundError, UnauthorizedError, BadRequestError, ForbiddenError } from './expressError';
import { RestaurantInterface } from '../models/RestaurantInterface';

export interface InterfaceSocket extends Socket {
    user?: RestaurantInterface;
}

export const io = new Server(server, {
    cors: {
        origin: "<http://example.com>",
    }
});

module.exports = { io };