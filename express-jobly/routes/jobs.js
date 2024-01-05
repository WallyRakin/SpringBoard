"use strict";


const jsonschema = require("jsonschema");
const express = require("express");
const { BadRequestError, UnauthorizedError, NotFoundError } = require("../expressError");
const { authenticateJWT, ensureLoggedIn } = require("../middleware/auth");
const Job = require("../models/job");

// JSON schema for validating job data
const jobNewSchema = require("../schemas/jobNew.json");
const jobUpdateSchema = require("../schemas/jobUpdate.json");

// Create a new router for job routes
const router = new express.Router();

// POST /jobs - Create a new job (Admins only)
router.post("/", authenticateJWT, ensureLoggedIn, async function (req, res, next) {
    try {
        const validator = jsonschema.validate(req.body, jobNewSchema);
        if (!validator.valid) {
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }

        if (!res.locals.user.isAdmin) {
            throw new UnauthorizedError();
        }

        const job = await Job.create(req.body);
        return res.status(201).json({ job });
    } catch (err) {
        return next(err);
    }
});

// GET /jobs - Get a list of jobs (No authentication required)
router.get("/", async function (req, res, next) {
    try {
        const { title, minSalary, hasEquity } = req.query
        const jobs = await Job.findAll({ title, minSalary, hasEquity });
        return res.json({ jobs });
    } catch (err) {
        return next(err);
    }
});

// GET /jobs/:id - Get a specific job by ID (No authentication required)
router.get("/:id", async function (req, res, next) {
    try {
        const job = await Job.get(req.params.id);
        return res.json({ job });
    } catch (err) {
        return next(err);
    }
});

// PATCH /jobs/:id - Update a specific job (Admins only)
router.patch("/:id", authenticateJWT, ensureLoggedIn, async function (req, res, next) {
    try {
        const validator = jsonschema.validate(req.body, jobUpdateSchema);
        if (!validator.valid) {
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }

        if (!res.locals.user.isAdmin) {
            throw new UnauthorizedError();
        }

        const job = await Job.update(req.params.id, req.body);
        return res.json({ job });
    } catch (err) {
        return next(err);
    }
});

// DELETE /jobs/:id - Delete a specific job (Admins only)
router.delete("/:id", authenticateJWT, ensureLoggedIn, async function (req, res, next) {
    try {
        if (!res.locals.user.isAdmin) {
            throw new UnauthorizedError();
        }

        await Job.remove(req.params.id);
        return res.json({ deleted: Number.parseInt(req.params.id) });
    } catch (err) {
        return next(err);
    }
});

// Export the router
module.exports = router;