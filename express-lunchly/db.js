/** Database for lunchly */

const pg = require("pg");

const db = new pg.Client('postgresql://test:pass@localhost/lunchly');

db.connect();

module.exports = db;
