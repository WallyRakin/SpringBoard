/** Common config for message.ly */

// read .env files and make environmental variables

require("dotenv").config();

'postgresql://test:pass@localhost/biztime'

const DB_URI = (process.env.NODE_ENV === "test")
  ? "postgresql://test:pass@localhost/messagely_test"
  : "postgresql://test:pass@localhost/messagely";

const SECRET_KEY = process.env.SECRET_KEY || "secret";

const BCRYPT_WORK_FACTOR = 12;


module.exports = {
  DB_URI,
  SECRET_KEY,
  BCRYPT_WORK_FACTOR,
};