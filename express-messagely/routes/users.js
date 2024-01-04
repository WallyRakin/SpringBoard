const express = require("express");
const router = new express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const authenticateJWT = require("./utilities/authenticateJWT")
const { SECRET_KEY } = require("../config");
const ExpressError = require("../expressError");

router.use(express.json());

/** GET / - get list of users.
 *
 * => {users: [{username, first_name, last_name, phone}, ...]}
 *
 **/
router.get("/", async (req, res, next) => {
    try {
        const users = await User.all();
        return res.json({ users });
    } catch (err) {
        next(err);
    }
});


/** GET /:username - get detail of users.
 *
 * => {user: {username, first_name, last_name, phone, join_at, last_login_at}}
 *
 **/
router.get("/:username", authenticateJWT, async (req, res, next) => {
    try {
        if (req.params.username !== req.user.username) {
            throw new ExpressError("Unauthorized: Token's username doesn't match URL parameter", 401);
        };

        const user = await User.get(req.params.username);
        return res.json({ user });
    } catch (err) {
        next(err);
    }
});


/** GET /:username/to - get messages to user
 *
 * => {messages: [{id,
 *                 body,
 *                 sent_at,
 *                 read_at,
 *                 from_user: {username, first_name, last_name, phone}}, ...]}
 *
 **/
router.get("/:username/to", authenticateJWT, async (req, res, next) => {
    try {
        if (req.params.username !== req.user.username) {
            throw new ExpressError("Unauthorized: Token's username doesn't match URL parameter", 401);
        };

        const messages = await User.messagesTo(req.params.username);
        return res.json({ messages });
    } catch (err) {
        next(err);
    }
});


/** GET /:username/from - get messages from user
 *
 * => {messages: [{id,
 *                 body,
 *                 sent_at,
 *                 read_at,
 *                 to_user: {username, first_name, last_name, phone}}, ...]}
 *
 **/
router.get("/:username/from", authenticateJWT, async (req, res, next) => {
    try {
        if (req.params.username !== req.user.username) {
            throw new ExpressError("Unauthorized: Token's username doesn't match URL parameter", 401);
        };

        const messages = await User.messagesFrom(req.params.username);
        return res.json({ messages });
    } catch (err) {
        next(err);
    }
});


module.exports = router;