// Routes for invoices

const express = require("express");
const router = express.Router();
const db = require('../db')
const ExpressError = require("../expressError")

router.route('/industries')
    .get(async (req, res, next) => {
        try {
            const industries = await db.query(`SELECT i.code, i.industry, ARRAY_AGG(ci.company_code) as companies FROM industries i LEFT JOIN company_industries ci ON i.code = ci.industry_code GROUP BY i.code`).then(response => { return response.rows[0] });
            return res.json({ industries });
        } catch (err) {
            return next(err);
        }
    })
    .post(async (req, res, next) => {
        try {
            const { code, industry: industryName } = req.body;
            const industry = await db.query(`INSERT INTO industries (code, industry) VALUES ($1, $2) RETURNING code, industry`, [code, industryName]).then(response => { return response.rows[0] });
            return res.status(201).json({ industry });
        } catch (err) {
            return next(err);
        }
    })

router.post('/company_industries', async (req, res, next) => {
    try {
        const { company_code, industry_code } = req.body;
        const association = await db.query(`INSERT INTO company_industries (company_code, industry_code) VALUES ($1, $2) RETURNING company_code, industry_code`, [company_code, industry_code]).then(response => { return response.rows[0] });
        return res.status(201).json({ association });
    } catch (err) {
        return next(err);
    }
});


module.exports = router