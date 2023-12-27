// Routes for companies

const express = require("express");
const router = new express.Router();
const db = require('../db')
const ExpressError = require("../expressError")


router.use(express.json());

router.route('/')
    .get(async (req, res, next) => {
        try {
            const result = await db.query('SELECT * FROM companies', []);
            return res.json({ companies: result.rows });
        } catch (err) {
            next(err);
        };
    })
    .post(async (req, res, next) => {
        const { code, name, description } = req.body;
        try {
            if (!code || !name) {
                const err = new ExpressError("Required data is missing or improperly formatted.", 400);
                err.status = 400;
                throw err;
            };
            const result = await db.query(`INSERT INTO companies (code, name, description) VALUES ($1, $2, $3) RETURNING *`, [code, name, description]);
            return res.json({ company: result.rows[0] });

        } catch (err) {
            next(err);
        };
    });


router.route('/:code')
    .get(async (req, res, next) => {
        const { code } = req.params;

        try {
            const company = await db.query('SELECT * FROM companies WHERE code = $1', [code]).then(response => { return response.rows[0] });

            if (!company) {
                throw new ExpressError("Company not found", 404);
            };

            const invoices = await db.query(`SELECT * FROM invoices WHERE comp_code = $1`, [code]).then(response => { return response.rows[0] });

            return res.json({ company: { ...company, invoices } });
        } catch (err) {
            next(err);
        };
    })
    .put(async (req, res, next) => {
        const { code, name, description } = req.body;
        try {
            const reference = await db.query('SELECT * FROM companies WHERE code = $1', [code]).then(response => { return response.rows[0] });

            if (!reference) {
                throw new ExpressError("Company not found", 404);
            };

            const updateParams = [
                name || reference.name,
                description || reference.description,
                code,
            ];
            const company = await db.query('UPDATE companies SET name = $1, description = $2 WHERE code = $3 RETURNING *', updateParams).then(response => { return response.rows[0] });

            return res.json({ company });

        } catch (err) {
            next(err);
        };
    })
    .delete(async (req, res, next) => {
        const { code } = req.params;

        try {
            const company = await db.query('DELETE FROM companies WHERE code = $1 RETURNING *', [code]).then(response => { return response.rows[0] });

            if (!company) {
                throw new ExpressError("Company not found", 404);
            };

            return res.json({ status: "deleted" });
        } catch (err) {
            next(err);
        };
    });


module.exports = router