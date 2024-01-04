const express = require("express");
const router = new express.Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");
const ExpressError = require("../expressError")

router.use(express.json());


/** POST /login - login: {username, password} => {token}
 *
 * Make sure to update their last-login!
 *
 **/
router.post("/login", async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const authenticated = await User.authenticate(username, password);

        if (authenticated) {
            await User.updateLoginTimestamp(username); // Update last-login timestamp
            const token = jwt.sign({ username }, SECRET_KEY); // Generate a token
            return res.json({ token });
        } else {
            throw new ExpressError("Invalid username or password", 400);
        }
    } catch (err) {
        next(err);
    }
});

/** POST /register - register user: registers, logs in, and returns token.
 *
 * {username, password, first_name, last_name, phone} => {token}.
 *
 */
router.post("/register", async (req, res, next) => {
    try {
        const { username, password, first_name, last_name, phone } = req.body;

        // Register the user
        await User.register({ username, password, first_name, last_name, phone });

        const token = jwt.sign({ username }, SECRET_KEY); // Generate a token

        return res.status(201).json({ token });
    } catch (err) {
        next(err);
    }
});

module.exports = router;