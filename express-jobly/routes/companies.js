"use strict";
/** Routes for companies. */

const jsonschema = require("jsonschema");
const express = require("express");

const { BadRequestError, UnauthorizedError, NotFoundError } = require("../expressError");
const { authenticateJWT, ensureLoggedIn } = require("../middleware/auth");
const Company = require("../models/company");

const companyNewSchema = require("../schemas/companyNew.json");
const companyUpdateSchema = require("../schemas/companyUpdate.json");

const router = new express.Router();


/** POST / { company } =>  { company }
 *
 * company should be { handle, name, description, numEmployees, logoUrl }
 *
 * Returns { handle, name, description, numEmployees, logoUrl }
 *
 * Authorization required: login
 */

router.post("/", authenticateJWT, ensureLoggedIn, async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, companyNewSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }

    if (!res.locals.user.isAdmin) {
      throw new UnauthorizedError();
    }

    const company = await Company.create(req.body);
    return res.status(201).json({ company });
  } catch (err) {
    return next(err);
  }
});

/**
 * GET /companies - Get a list of companies with optional filtering.
 * 
 * This route retrieves a list of companies. It also supports filtering based on the company's name,
 * minimum number of employees, and maximum number of employees. The filters are passed as query
 * parameters and are all optional. If the minEmployees parameter is greater than the maxEmployees
 * parameter, a 400 error with an appropriate message is returned.
 *
 * Query Parameters:
 * - name: (string) Filter by company name (case-insensitive, partial matches allowed).
 * - minEmployees: (integer) Filter to companies with at least this number of employees.
 * - maxEmployees: (integer) Filter to companies with no more than this number of employees.
 *
 * Returns:
 * - On success: JSON object { companies: [{ handle, name, description, numEmployees, logoUrl }, ...] }
 * - On error: 400 Bad Request error with an appropriate message if minEmployees is greater than maxEmployees.
 *
 * Authorization required: None
 */

router.get("/", async function (req, res, next) {
  try {
    const { name, minEmployees, maxEmployees } = req.query;

    // Check if minEmployees is greater than maxEmployees
    if (minEmployees && maxEmployees && minEmployees > maxEmployees) {
      throw new BadRequestError("minEmployees cannot be greater than maxEmployees");
    }

    // Pass the filters to the Company.findAll method
    const companies = await Company.findAll({ name, minEmployees, maxEmployees });
    return res.json({ companies });
  } catch (err) {
    return next(err);
  }
});

/** GET /[handle]  =>  { company }
 *
 *  Company is { handle, name, description, numEmployees, logoUrl, jobs }
 *   where jobs is [{ id, title, salary, equity }, ...]
 *
 * Authorization required: none
 */

router.get("/:handle", async function (req, res, next) {
  try {
    const company = await Company.get(req.params.handle);
    return res.json({ company });
  } catch (err) {
    return next(err);
  }
});

/** PATCH /[handle] { fld1, fld2, ... } => { company }
 *
 * Patches company data.
 *
 * fields can be: { name, description, numEmployees, logo_url }
 *
 * Returns { handle, name, description, numEmployees, logo_url }
 *
 * Authorization required: login
 */

router.patch("/:handle", authenticateJWT, ensureLoggedIn, async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, companyUpdateSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }

    if (!res.locals.user.isAdmin) {
      throw new UnauthorizedError();
    }

    const company = await Company.update(req.params.handle, req.body);

    if (!company) { throw new NotFoundError() };

    return res.json({ company });
  } catch (err) {
    return next(err);
  }
});

/** DELETE /[handle]  =>  { deleted: handle }
 *
 * Authorization: login
 */

router.delete("/:handle", authenticateJWT, ensureLoggedIn, async function (req, res, next) {
  try {
    if (!res.locals.user.isAdmin) {
      throw new UnauthorizedError();
    }

    await Company.remove(req.params.handle);
    return res.json({ deleted: req.params.handle });
  } catch (err) {
    return next(err);
  }
});


module.exports = router;
