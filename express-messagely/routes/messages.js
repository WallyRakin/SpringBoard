const express = require("express");
const router = new express.Router();
const Message = require("../models/message");
const jwt = require("jsonwebtoken");

const authenticateJWT = require("./utilities/authenticateJWT")
const { SECRET_KEY } = require("../config");
const ExpressError = require("../expressError");

router.use(express.json());

/** GET /:id - get detail of message.
 *
 * => {message: {id,
 *               body,
 *               sent_at,
 *               read_at,
 *               from_user: {username, first_name, last_name, phone},
 *               to_user: {username, first_name, last_name, phone}}
 *
 * Make sure that the currently-logged-in users is either the to or from user.
 *
 **/
router.get("/:id", authenticateJWT, async (req, res, next) => {
    try {
        const message = await Message.get(req.params.id);

        if (message.from_username === req.user.username || message.to_username === req.user.username) {
            throw new ExpressError("Unauthorized", 401);
        };

        return res.json({ message });
    } catch (err) {
        next(err);
    }
});


/** POST / - post message.
 *
 * {to_username, body} =>
 *   {message: {id, from_username, to_username, body, sent_at}}
 *
 **/
router.post("/", authenticateJWT, async (req, res, next) => {
    try {
        const { to_username, body } = req.body;

        const message = await Message.create({ from_username: req.user.username, to_username, body });


        return res.status(201).json({ message });
    } catch (err) {
        next(err);
    }
});


/** POST/:id/read - mark message as read:
 *
 *  => {message: {id, read_at}}
 *
 * Make sure that the only the intended recipient can mark as read.
 *
 **/
router.post("/:id/read", authenticateJWT, async (req, res, next) => {
    try {
        const message = await Message.markRead(req.params.id);


        console.info(message);

        if (message.to_username !== req.user.username) {
            throw new ExpressError("Unauthorized", 401);
        };

        return res.json({ message });
    } catch (err) {
        next(err);
    }
});

module.exports = router;