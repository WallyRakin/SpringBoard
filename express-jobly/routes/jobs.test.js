"use strict";

const request = require("supertest");

const db = require("../db");
const app = require("../app");
const Job = require("../models/job");


const {
    commonBeforeAll,
    commonBeforeEach,
    commonAfterEach,
    commonAfterAll,
    u1Token,
    u2Token,
    adminToken, // Assuming you have an admin token similar to the u1Token
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** POST /jobs */

describe("POST /jobs", function () {
    const newJob = {
        title: "New Job",
        salary: 100000,
        equity: 0.1,
        companyHandle: "c1",
    };

    test("ok for admin users", async function () {
        const resp = await request(app)
            .post("/jobs")
            .send(newJob)
            .set("authorization", `Bearer ${adminToken}`);
        expect(resp.statusCode).toEqual(201);
        expect(resp.body).toEqual({
            job: {
                ...newJob,
                id: expect.any(Number),
            },
        });
    });

    test("unauth for non-admin users", async function () {
        const resp = await request(app)
            .post("/jobs")
            .send(newJob)
            .set("authorization", `Bearer ${u1Token}`);
        expect(resp.statusCode).toEqual(401);
    });

    test("bad request with missing data", async function () {
        const resp = await request(app)
            .post("/jobs")
            .send({
                title: "Incomplete Job",
                salary: 50000,
            })
            .set("authorization", `Bearer ${adminToken}`);
        expect(resp.statusCode).toEqual(400);
    });

    // Add more tests as necessary
});

/************************************** GET /jobs */

describe("GET /jobs", function () {
    test("ok for anon", async function () {
        const resp = await request(app).get("/jobs");
        expect(resp.body).toEqual({
            jobs: expect.any(Array),
        });
    });

    // Add more tests for filtering functionality and specific cases
});

/************************************** GET /jobs/:id */

describe("GET /jobs/:id", function () {
    test("works for anon", async function () {
        const job = await Job.create({
            title: "New Job",
            salary: 100000,
            equity: 0.5,
            companyHandle: "c1"
        });
        const resp = await request(app).get(`/jobs/${job.id}`);
        expect(resp.body).toEqual({
            job: expect.any(Object),
        });
    });

    test("not found for no such job", async function () {
        const resp = await request(app).get(`/jobs/0`); // Assuming 0 is an invalid ID
        expect(resp.statusCode).toEqual(404);
    });

    // Add more tests as necessary
});

/************************************** PATCH /jobs/:id */

describe("PATCH /jobs/:id", function () {
    test("works for admin users", async function () {
        const job = await Job.create({
            title: "New Job",
            salary: 100000,
            equity: 0.5,
            companyHandle: "c1"
        });
        const resp = await request(app)
            .patch(`/jobs/${job.id}`)
            .send({
                title: "Updated Job",
            })
            .set("authorization", `Bearer ${adminToken}`);
        expect(resp.body).toEqual({
            job: expect.any(Object),
        });
    });

    test("unauth for non-admin users", async function () {
        const job = await Job.create({
            title: "New Job",
            salary: 100000,
            equity: 0.5,
            companyHandle: "c1"
        });
        const resp = await request(app)
            .patch(`/jobs/${job.id}`)
            .send({
                title: "Unauthorized Update",
            })
            .set("authorization", `Bearer ${u1Token}`);
        expect(resp.statusCode).toEqual(401);
    });

    // Add more tests as necessary
});

/************************************** DELETE /jobs/:id */

describe("DELETE /jobs/:id", function () {
    test("works for admin users", async function () {
        const job = await Job.create({
            title: "New Job",
            salary: 100000,
            equity: 0.5,
            companyHandle: "c1"
        });
        const resp = await request(app)
            .delete(`/jobs/${job.id}`) // Replace 1 with a valid job ID
            .set("authorization", `Bearer ${adminToken}`);
        expect(resp.body).toEqual({ deleted: job.id });
    });

    test("unauth for non-admin users", async function () {
        const job = await Job.create({
            title: "New Job",
            salary: 100000,
            equity: 0.5,
            companyHandle: "c1"
        });
        const resp = await request(app)
            .delete(`/jobs/${job.id}`) // Replace 1 with a valid job ID
            .set("authorization", `Bearer ${u1Token}`);
        expect(resp.statusCode).toEqual(401);
    });

    // Add more tests as necessary
});
