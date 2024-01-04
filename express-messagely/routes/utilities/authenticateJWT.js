const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../../config");
const ExpressError = require("../../expressError")


/**
 * Middleware to authenticate user based on the JWT token in the request headers
 */
function authenticateJWT(req, res, next) {
    try {
        const tokenFromBody = req.body._token;
        const tokenFromQuery = req.query._token;
        const tokenFromHeader = req.headers && req.headers.authorization ? req.headers.authorization.split(" ")[1] : null;

        // Prefer token from header, then from body, and lastly from query string
        const token = tokenFromHeader || tokenFromBody || tokenFromQuery;

        if (!token) {
            throw new ExpressError("Missing token", 401);
        }

        const payload = jwt.verify(token, SECRET_KEY);
        req.user = payload; // Store payload on req.user


        return next(); // Token is valid and username matches, proceed to the next middleware
    } catch (err) {
        return res.status(401).json({ error: err.message });
    }
}

module.exports = authenticateJWT;
