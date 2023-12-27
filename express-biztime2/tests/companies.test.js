const request = require('supertest');
const app = require('../app'); // Adjust the path to your app file

describe("Companies Routes", () => {
    describe("GET /companies", () => {
        test("It should get a list of all companies", async () => {
            const response = await request(app).get('/companies');
            expect(response.statusCode).toBe(200);
            expect(response.body.companies).toBeInstanceOf(Array);
            // Further checks can include verifying some expected companies
        });
    });

    describe("GET /companies/:code", () => {
        test("It should get details of a single company", async () => {
            const response = await request(app).get('/companies/apple');
            expect(response.statusCode).toBe(200);
            expect(response.body.company).toHaveProperty('code', 'apple');
            // Further checks on other properties can be included
        });
    });

    describe("POST /companies", () => {
        test("It should create a new company", async () => {
            const newCompany = { code: 'newco', name: 'New Co', description: 'A new company' };
            const response = await request(app).post('/companies').send(newCompany);
            expect(response.statusCode).toBe(201);
            expect(response.body.company).toHaveProperty('code', newCompany.code);
            // Check other properties and ensure the company is actually added
        });
    });

    describe("PUT /companies/:code", () => {
        test("It should update an existing company", async () => {
            const updates = { name: 'Updated Name', description: 'Updated Description' };
            const response = await request(app).put('/companies/apple').send(updates);
            expect(response.statusCode).toBe(200);
            expect(response.body.company).toHaveProperty('name', updates.name);
            // Further checks to ensure the update was successful
        });
    });
});



// describe('GET /industries', () => {
//     test('It should respond with an array of industries', async () => {
//         const response = await request(app).get('/industries');
//         expect(response.statusCode).toBe(200);
//         expect(response.body).toHaveProperty('industries');
//         expect(response.body.industries).toBeInstanceOf(Array);
//         // If you know what the data should look like, add more specific tests here
//     });
// });

// describe('POST /industries', () => {
//     test('It should add a new industry', async () => {
//         const newIndustry = { code: 'fin', industry: 'Finance' };
//         const response = await request(app).post('/industries').send(newIndustry);
//         expect(response.statusCode).toBe(201);
//         expect(response.body).toHaveProperty('industry');
//         expect(response.body.industry).toHaveProperty('code', newIndustry.code);
//         expect(response.body.industry).toHaveProperty('industry', newIndustry.industry);
//         // Add checks to ensure the data was actually added to the database
//     });
// });

// describe('POST /company_industries', () => {
//     test('It should associate an industry with a company', async () => {
//         const association = { company_code: 'apple', industry_code: 'tech' };
//         const response = await request(app).post('/company_industries').send(association);
//         expect(response.statusCode).toBe(201);
//         expect(response.body).toHaveProperty('association');
//         expect(response.body.association).toHaveProperty('company_code', association.company_code);
//         expect(response.body.association).toHaveProperty('industry_code', association.industry_code);
//         // Add checks to ensure the association was actually created in the database
//     });
// });
