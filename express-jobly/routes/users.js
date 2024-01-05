"use strict";

/** Routes for users. */

const jsonschema = require("jsonschema");

const express = require("express");
const { authenticateJWT, ensureLoggedIn } = require("../middleware/auth");
const { BadRequestError, UnauthorizedError, NotFoundError } = require("../expressError");
const User = require("../models/user");
const { createToken } = require("../helpers/tokens");
const userNewSchema = require("../schemas/userNew.json");
const userUpdateSchema = require("../schemas/userUpdate.json");

const router = express.Router();


/** POST / { user }  => { user, token }
 *
 * Adds a new user. This is not the registration endpoint --- instead, this is
 * only for admin users to add new users. The new user being added can be an
 * admin.
 *
 * This returns the newly created user and an authentication token for them:
 *  {user: { username, firstName, lastName, email, isAdmin }, token }
 *
 * Authorization required: login
 **/

router.post("/", authenticateJWT, ensureLoggedIn, async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, userNewSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError();
    }

    if (!res.locals.user.isAdmin) {
      throw new UnauthorizedError();
    }

    const user = await User.register(req.body);
    const token = createToken(user);
    return res.status(201).json({ user, token });
  } catch (err) {
    return next(err);
  }
});


/** GET / => { users: [ {username, firstName, lastName, email }, ... ] }
 *
 * Returns list of all users.
 *
 * Authorization required: login & isAdmin
 **/

router.get("/", authenticateJWT, ensureLoggedIn, async function (req, res, next) {
  try {
    if (!res.locals.user.isAdmin) {
      throw new UnauthorizedError();
    }
    const users = await User.findAll();
    return res.json({ users });
  } catch (err) {
    return next(err);
  }
});


/** GET /[username] => { user }
 *
 * Returns { username, firstName, lastName, isAdmin }
 *
 * Authorization required: login
 **/

router.get("/:username", authenticateJWT, ensureLoggedIn, async function (req, res, next) {
  try {
    if (!(res.locals.user.isAdmin || res.locals.user.username == req.params.username)) {
      throw new UnauthorizedError();
    }
    const user = await User.get(req.params.username);
    return res.json({ user });
  } catch (err) {
    return next(err);
  }
});


/** PATCH /[username] { user } => { user }
 *
 * Data can include:
 *   { firstName, lastName, password, email }
 *
 * Returns { username, firstName, lastName, email, isAdmin }
 *
 * Authorization required: login
 **/

router.patch("/:username", authenticateJWT, ensureLoggedIn, async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, userUpdateSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }
    if (!(res.locals.user.isAdmin || res.locals.user.username == req.params.username)) {
      throw new UnauthorizedError();
    }

    const user = await User.update(req.params.username, req.body);
    return res.json({ user });
  } catch (err) {
    return next(err);
  }
});


/** DELETE /[username]  =>  { deleted: username }
 *
 * Authorization required: login
 **/

router.delete("/:username", authenticateJWT, ensureLoggedIn, async function (req, res, next) {
  try {
    if (!res.locals.user.isAdmin || res.locals.user.username == req.params.username) {
      throw new UnauthorizedError();
    }
    await User.remove(req.params.username);
    return res.json({ deleted: req.params.username });
  } catch (err) {
    return next(err);
  }
});

/** POST /users/:username/jobs/:id - Apply for a job
 * 
 * Allows a user to apply for a job or an admin to do it for them.
 * Returns { applied: jobId }
 *
 * Authorization required: login
 */
router.post("/:username/jobs/:id", authenticateJWT, ensureLoggedIn, async function (req, res, next) {
  try {
    const { username, id: jobId } = req.params;

    if (res.locals.user.isAdmin == false && res.locals.user.username !== username) {
      throw new UnauthorizedError();
    }

    const application = await User.apply(username, jobId);
    return res.status(201).json(application);
  } catch (err) {
    return next(err);
  }
});


module.exports = router;
