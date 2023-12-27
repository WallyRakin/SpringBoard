// Routes for invoices

const express = require("express");
const router = new express.Router();
const db = require('../db')
const ExpressError = require("../expressError")


router.use(express.json());

router.route('/')
    .get(async (req, res, next) => {
        try {
            const invoices = await db.query('SELECT id, comp_code FROM invoices').then(response => { return response.rows[0] });
            return res.json({ invoices });
        } catch (err) {
            return next(err);
        }
    })
    .post(async (req, res, next) => {
        try {
            const { comp_code, amt } = req.body;
            const invoice = await db.query(
                `INSERT INTO invoices (comp_code, amt) VALUES ($1, $2) RETURNING *`,
                [comp_code, amt])
                .then(response => { return response.rows[0] });

            return res.status(201).json({ invoice });
        } catch (err) {
            return next(err);
        }
    })

router.route('/:id')
    .get(async (req, res, next) => {
        try {
            const { id } = req.params;
            const invoice = await db.query(`SELECT * FROM invoices WHERE id = $1`, [id]).then(response => { return response.rows[0] });

            if (!invoice) {
                throw new ExpressError("Invoice not found", 404);
            }

            const company = await db.query(`SELECT * FROM companies WHERE code = $1`, [invoice.comp_code]).then(response => { return response.rows[0] });
            delete invoice.comp_code

            return res.json({ invoice: { ...invoice, company } });
        } catch (err) {
            return next(err);
        }
    })
    .put(async (req, res, next) => {
        try {
            const { id } = req.params;
            const { amt, paid } = req.body;

            const reference = await db.query(`SELECT * FROM invoices WHERE id = $1`, [id]).then(response => { return response.rows[0] });

            if (!reference) {
                throw new ExpressError("Invoice not found", 404);
            };

            const updateParams = [
                amt || reference.amt,
                paid || reference.paid,
                id,
            ];

            const invoice = await db.query(
                `UPDATE invoices SET amt = $1, paid = $2 WHERE id = $3 RETURNING *`,
                updateParams)
                .then(response => { return response.rows[0] });


            return res.json({ invoice });
        } catch (err) {
            return next(err);
        }
    })


module.exports = router