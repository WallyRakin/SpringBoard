import http from 'http';
import { app } from '../app';


export const server = http.createServer(app);

module.exports = { server }