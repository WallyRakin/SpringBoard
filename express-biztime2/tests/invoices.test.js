const request = require('supertest');
const app = require('../app'); // Adjust the path to your app file

describe("Invoices Routes", () => {
    describe("GET /invoices", () => {
        test("It should get a list of all invoices", async () => {
            const response = await request(app).get('/invoices');
            expect(response.statusCode).toBe(200);
            expect(response.body.invoices).toBeInstanceOf(Array);
            // Further checks can include verifying some expected invoices
        });
    });

    describe("GET /invoices/:id", () => {
        test("It should get details of a single invoice", async () => {
            const response = await request(app).get('/invoices/1');
            expect(response.statusCode).toBe(200);
            expect(response.body.invoice).toHaveProperty('id', 1);
            // Further checks on other properties can be included
        });
    });

    describe("POST /invoices", () => {
        test("It should create a new invoice", async () => {
            const newInvoice = { comp_code: 'apple', amt: 500 };
            const response = await request(app).post('/invoices').send(newInvoice);
            expect(response.statusCode).toBe(201);
            expect(response.body.invoice).toHaveProperty('comp_code', newInvoice.comp_code);
            // Check other properties and ensure the invoice is actually added
        });
    });

    describe("PUT /invoices/:id", () => {
        test("It should update an existing invoice", async () => {
            const updates = { amt: 600 };
            const response = await request(app).put('/invoices/1').send(updates);
            expect(response.statusCode).toBe(200);
            expect(response.body.invoice).toHaveProperty('amt', updates.amt);
            // Further checks to ensure the update was successful
        });
    });

    describe("DELETE /invoices/:id", () => {
        test("It should delete an invoice", async () => {
            const response = await request(app).delete('/invoices/1');
            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual({ status: "deleted" });
            // Further checks to ensure the invoice was actually deleted
        });
    });
});
