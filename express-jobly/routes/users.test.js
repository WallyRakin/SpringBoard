"use strict";

const request = require("supertest");

const db = require("../db.js");
const app = require("../app");
const User = require("../models/user");

const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  u1Token,
  u2Token,
  adminToken
} = require("./_testCommon");
const Job = require("../models/job.js");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** POST /users */

describe("POST /users", function () {
  test("unauth for non-admin users", async function () {
    const resp = await request(app)
      .post("/users")
      .send({
        username: "u-new",
        firstName: "First-new",
        lastName: "Last-newL",
        password: "password-new",
        email: "new@email.com",
        isAdmin: true,
      })
      .set("authorization", `Bearer ${u1Token}`); // non-admin token
    expect(resp.statusCode).toEqual(401);
  });

  test("works for users: create admin", async function () {
    const resp = await request(app)
      .post("/users")
      .send({
        username: "u-new",
        firstName: "First-new",
        lastName: "Last-newL",
        password: "password-new",
        email: "new@email.com",
        isAdmin: true,
      })
      .set("authorization", `Bearer ${adminToken}`);
    expect(resp.statusCode).toEqual(201);
    expect(resp.body).toEqual({
      user: {
        username: "u-new",
        firstName: "First-new",
        lastName: "Last-newL",
        email: "new@email.com",
        isAdmin: true,
      }, token: expect.any(String),
    });
  });

  test("unauth for anon", async function () {
    const resp = await request(app)
      .post("/users")
      .send({
        username: "u-new",
        firstName: "First-new",
        lastName: "Last-newL",
        password: "password-new",
        email: "new@email.com",
        isAdmin: true,
      });
    expect(resp.statusCode).toEqual(401);
  });

  test("bad request if missing data", async function () {
    const resp = await request(app)
      .post("/users")
      .send({
        username: "u-new",
      })
      .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(400);
  });

  test("bad request if invalid data", async function () {
    const resp = await request(app)
      .post("/users")
      .send({
        username: "u-new",
        firstName: "First-new",
        lastName: "Last-newL",
        password: "password-new",
        email: "not-an-email",
        isAdmin: true,
      })
      .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(400);
  });
});

/************************************** GET /users */

describe("GET /users", function () {

  test("unauth for anon", async function () {
    const resp = await request(app)
      .get("/users");
    expect(resp.statusCode).toEqual(401);
  });

  test("fails: test next() handler", async function () {
    // there's no normal failure event which will cause this route to fail ---
    // thus making it hard to test that the error-handler works with it. This
    // should cause an error, all right :)
    await db.query("DROP TABLE users CASCADE");
    const resp = await request(app)
      .get("/users")
      .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(401);
  });

  test("works for admin users", async function () {
    // ...assuming you have an adminToken variable set up for an admin user...
    const resp = await request(app)
      .get("/users")
      .set("authorization", `Bearer ${adminToken}`); // admin token
    expect(resp.statusCode).toEqual(200);
    // ...check that the response includes the users...
  });
});

/************************************** GET /users/:username */

describe("GET /users/:username", function () {
  test("works for users", async function () {
    const resp = await request(app)
      .get(`/users/u1`)
      .set("authorization", `Bearer ${u1Token}`);
    expect(resp.body).toEqual({
      user: {
        username: "u1",
        firstName: "U1F",
        lastName: "U1L",
        email: "user1@user.com",
        isAdmin: false,
        jobs: expect.any(Array)
      },
    });
  });

  test("unauth for anon", async function () {
    const resp = await request(app)
      .get(`/users/u1`);
    expect(resp.statusCode).toEqual(401);
  });

  test("unauth if not the same user or admin", async function () {
    const resp = await request(app)
      .get(`/users/u2`) // assuming u1 is trying to access u2's data
      .set("authorization", `Bearer ${u1Token}`); // non-admin token of u1
    expect(resp.statusCode).toEqual(401);
  });
});

/************************************** PATCH /users/:username */

describe("PATCH /users/:username", () => {
  test("works for users", async function () {
    const resp = await request(app)
      .patch(`/users/u1`)
      .send({
        firstName: "New",
      })
      .set("authorization", `Bearer ${u1Token}`);
    expect(resp.body).toEqual({
      user: {
        username: "u1",
        firstName: "New",
        lastName: "U1L",
        email: "user1@user.com",
        isAdmin: false,
      },
    });
  });

  test("unauth for anon", async function () {
    const resp = await request(app)
      .patch(`/users/u1`)
      .send({
        firstName: "New",
      });
    expect(resp.statusCode).toEqual(401);
  });


  test("bad request if invalid data", async function () {
    const resp = await request(app)
      .patch(`/users/u1`)
      .send({
        firstName: 42,
      })
      .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(400);
  });

  test("works: set new password", async function () {
    const resp = await request(app)
      .patch(`/users/u1`)
      .send({
        password: "new-password",
      })
      .set("authorization", `Bearer ${u1Token}`);
    expect(resp.body).toEqual({
      user: {
        username: "u1",
        firstName: "U1F",
        lastName: "U1L",
        email: "user1@user.com",
        isAdmin: false,
      },
    });
    const isSuccessful = await User.authenticate("u1", "new-password");
    expect(isSuccessful).toBeTruthy();
  });

  test("unauth if not the same user or admin", async function () {
    const resp = await request(app)
      .patch(`/users/u2`) // assuming u1 is trying to patch u2's data
      .send({ firstName: "NewName" })
      .set("authorization", `Bearer ${u1Token}`); // non-admin token of u1
    expect(resp.statusCode).toEqual(401);
  });
});

/************************************** DELETE /users/:username */

describe("DELETE /users/:username", function () {
  test("unauth for anon", async function () {
    const resp = await request(app)
      .delete(`/users/u1`);
    expect(resp.statusCode).toEqual(401);
  });


  test("unauth for non-admin users", async function () {
    const resp = await request(app)
      .delete(`/users/u2`) // assuming u1 is trying to delete u2
      .set("authorization", `Bearer ${u1Token}`); // non-admin token of u1
    expect(resp.statusCode).toEqual(401);
  });
});

/************************************** POST /users/:username/jobs/:id */

describe("POST /users/:username/jobs/:id", function () {


  test("works for same user", async function () {
    const job = await Job.create({
      title: "New Job",
      salary: 100000,
      equity: 0.5,
      companyHandle: "c1"
    });
    const resp = await request(app)
      .post(`/users/u1/jobs/${job.id}`) // Replace with actual job ID from seeded data
      .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(201);
    expect(resp.body).toMatchObject({ applied: job.id });
  });

  test("works for admin", async function () {
    const job = await Job.create({
      title: "New Job",
      salary: 100000,
      equity: 0.5,
      companyHandle: "c1"
    });
    const resp = await request(app)
      .post(`/users/u1/jobs/${job.id}`) // Replace with actual job ID from seeded data
      .set("authorization", `Bearer ${adminToken}`);
    expect(resp.statusCode).toEqual(201);
    expect(resp.body).toMatchObject({ applied: job.id });
  });

  test("unauth for different non-admin user", async function () {
    const job = await Job.create({
      title: "New Job",
      salary: 100000,
      equity: 0.5,
      companyHandle: "c1"
    });
    // Assuming u2Token is a token for a different non-admin user
    const resp = await request(app)
      .post(`/users/u1/jobs/${job.id}`) // Replace with actual job ID from seeded data
      .set("authorization", `Bearer ${u2Token}`);
    expect(resp.statusCode).toEqual(401);
  });

  test("not found if no such user", async function () {
    const job = await Job.create({
      title: "New Job",
      salary: 100000,
      equity: 0.5,
      companyHandle: "c1"
    });
    const resp = await request(app)
      .post(`/users/nope/jobs/${job.id}`) // Replace with actual job ID from seeded data
      .set("authorization", `Bearer ${adminToken}`);
    expect(resp.statusCode).toEqual(404);
  });

  test("not found if no such job", async function () {
    const resp = await request(app)
      .post(`/users/u1/jobs/0`) // 0 is an assumed non-existent job ID
      .set("authorization", `Bearer ${adminToken}`);
    expect(resp.statusCode).toEqual(404);
  });
});
