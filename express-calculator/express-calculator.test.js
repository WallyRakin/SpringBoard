const request = require('supertest');
const app = require('./express-calculator');

describe('Statistical Operations', () => {
    // Tests for /mean route
    describe('GET /mean', () => {
        test('should calculate mean successfully', async () => {
            const response = await request(app).get('/mean?nums=1,2,3,4');
            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual({ operation: 'mean', value: 2.5 });
        });

        test('should return error for invalid numbers', async () => {
            const response = await request(app).get('/mean?nums=1,2,foo');
            expect(response.statusCode).toBe(400);
            expect(response.body.error).toContain('Invalid request.');
        });

        test('should return error for empty nums parameter', async () => {
            const response = await request(app).get('/mean');
            expect(response.statusCode).toBe(400);
            expect(response.body.error).toContain('Nums are required.');
        });
    });

    // Tests for /median route
    describe('GET /median', () => {
        test('should calculate median successfully', async () => {
            const response = await request(app).get('/median?nums=1,2,3,4,5');
            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual({ operation: 'median', value: 3 });
        });

        test('should return error for invalid numbers', async () => {
            const response = await request(app).get('/median?nums=1,2,foo');
            expect(response.statusCode).toBe(400);
            expect(response.body.error).toContain('Invalid request.');
        });

        test('should return error for empty nums parameter', async () => {
            const response = await request(app).get('/median');
            expect(response.statusCode).toBe(400);
            expect(response.body.error).toContain('Nums are required.');
        });
    });

    // Tests for /mode route
    describe('GET /mode', () => {
        test('should calculate mode successfully', async () => {
            const response = await request(app).get('/mode?nums=1,2,2,3');
            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual({ operation: 'mode', value: [2] });
        });

        test('should return error for invalid numbers', async () => {
            const response = await request(app).get('/mode?nums=1,2,foo');
            expect(response.statusCode).toBe(400);
            expect(response.body.error).toContain('Invalid request.');
        });

        test('should return error for empty nums parameter', async () => {
            const response = await request(app).get('/mode');
            expect(response.statusCode).toBe(400);
            expect(response.body.error).toContain('Nums are required.');
        });
    });
});

