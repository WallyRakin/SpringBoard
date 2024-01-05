"use strict";

const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");
const Job = require("../models/job");
const { sqlForPartialUpdate } = require("../helpers/sql");
const {
    commonBeforeAll,
    commonBeforeEach,
    commonAfterEach,
    commonAfterAll,
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

describe("Job.create", () => {
    const newJob = {
        title: "New Job",
        salary: 100000,
        equity: 0.5,
        companyHandle: "c1"
    };

    test("Can create a job with valid data", async () => {
        const job = await Job.create(newJob);
        expect(job).toEqual(expect.objectContaining(newJob));
        // Verify the job is in the database
        const found = await db.query("SELECT * FROM jobs WHERE title='New Job'");
        expect(found.rows.length).toEqual(1);
    });

    test("Throws BadRequestError for duplicate job", async () => {
        try {
            await Job.create(newJob);
            await Job.create(newJob); // Attempt to create a duplicate job
        } catch (err) {
            expect(err instanceof BadRequestError).toBeTruthy();
        }
    });
});

describe("Job.findAll", () => {
    test("Can retrieve all jobs without filters", async () => {
        const jobs = await Job.findAll({});
        expect(jobs).toEqual(expect.any(Array));
        jobs.forEach(job => {
            expect(job).toEqual(expect.objectContaining({
                id: expect.any(Number),
                title: expect.any(String),
                salary: expect.any(Number),
                equity: expect.any(Number),
                companyHandle: expect.any(String)
            }));
        });
    });

    test("Can retrieve jobs with title filter", async () => {
        await Job.create({ title: "Software Engineer", salary: 120000, equity: 0, companyHandle: "c1" });  // Ensure there's a job with 'Engineer' in the title
        const jobs = await Job.findAll({ title: "Engineer" });
        expect(jobs).toEqual(expect.arrayContaining([
            expect.objectContaining({ title: expect.stringMatching(/Engineer/i) }),
        ]));
    });

    test("Can retrieve jobs with minSalary filter", async () => {
        await Job.create({ title: "Low Salary Job", salary: 50000, equity: 0, companyHandle: "c1" });
        const jobs = await Job.findAll({ minSalary: 75000 });
        expect(jobs.every(job => job.salary >= 75000)).toBeTruthy();
    });

    test("Can retrieve jobs with hasEquity filter", async () => {
        await Job.create({ title: "Equity Job", salary: 100000, equity: 0.1, companyHandle: "c1" });
        const jobsWithEquity = await Job.findAll({ hasEquity: true });
        expect(jobsWithEquity.every(job => job.equity > 0)).toBeTruthy();
    });

});

describe("Job.get", () => {
    test("Can retrieve a job by id", async () => {
        const newJob = await Job.create({ title: "New Job", salary: 100000, equity: 0.5, companyHandle: "c1" });
        const foundJob = await Job.get(newJob.id);
        expect(foundJob).toEqual(expect.objectContaining(newJob));
    });

    test("Throws NotFoundError if job doesn't exist", async () => {
        try {
            await Job.get(0); // assuming 0 is an invalid ID
        } catch (err) {
            expect(err instanceof NotFoundError).toBeTruthy();
        }
    });
});

describe("Job.update", () => {
    test("Can update a job's data", async () => {
        const newJob = await Job.create({ title: "Old Title", salary: 50000, equity: 0, companyHandle: "c1" });
        const updatedJob = await Job.update(newJob.id, { title: "New Title", salary: 75000 });
        expect(updatedJob).toEqual(expect.objectContaining({ title: "New Title", salary: 75000 }));
    });

    test("Throws NotFoundError if job doesn't exist", async () => {
        try {
            await Job.update(0, { title: "Nope" }); // assuming 0 is an invalid ID
        } catch (err) {
            expect(err instanceof NotFoundError).toBeTruthy();
        }
    });

});

describe("Job.remove", () => {
    test("Can remove a job", async () => {
        const newJob = await Job.create({ title: "Short-lived Job", salary: 50000, equity: 0, companyHandle: "c1" });
        await Job.remove(newJob.id);
        const res = await db.query("SELECT * FROM jobs WHERE id=$1", [newJob.id]);
        expect(res.rows.length).toEqual(0);
    });

    test("Throws NotFoundError if job doesn't exist", async () => {
        try {
            await Job.remove(0); // assuming 0 is an invalid ID
        } catch (err) {
            expect(err instanceof NotFoundError).toBeTruthy();
        }
    });
});
