/** Database setup for BizTime. */

const pg = require("pg");

const db = new pg.Client('postgresql://test:pass@localhost/biztime');

db.connect();

module.exports = db;