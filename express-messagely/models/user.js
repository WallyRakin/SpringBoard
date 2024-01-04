/** User class for message.ly */
const bcrypt = require('bcrypt');

const db = require("../db");
const ExpressError = require("../expressError")


/** User of the site. */

class User {

  /** register new user -- returns
   *    {username, password, first_name, last_name, phone}
   */

  static async register({ username, password, first_name, last_name, phone }) {

    const currentTimestamp = new Date().toISOString();
    const passwordHash = await bcrypt.hash(password, 10);

    const result = await db.query(
      `INSERT INTO users (username, password, first_name, last_name, phone, join_at, last_login_at) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [username, passwordHash, first_name, last_name, phone, currentTimestamp, currentTimestamp]
    );
    if (!result.rows[0]) { throw new ExpressError('Registration failed', 500); };
  };

  /** Authenticate: is this username/password valid? Returns boolean. */

  static async authenticate(username, password) {
    // Retrieve user with the given username
    const result = await db.query(
      `SELECT password FROM users WHERE username = $1`,
      [username]
    );

    const user = result.rows[0];

    if (user) {
      // Compare hashed password and return true if it matches
      if (await bcrypt.compare(password, user.password)) {
        return true;
      }
    }
    // Return false if user doesn't exist or password doesn't match
    return false;
  }

  /** Update last_login_at for user */

  static async updateLoginTimestamp(username) {
    const currentTimestamp = new Date().toISOString();

    const result = await db.query(
      `UPDATE users SET last_login_at = $1 WHERE username = $2 RETURNING username`,
      [currentTimestamp, username]
    );

    if (!result.rows[0]) { throw new ExpressError('Updating login timestamp failed', 500); };
  };

  /** All: basic info on all users:
   * [{username, first_name, last_name, phone}, ...] */

  static async all() {
    const result = await db.query(
      `SELECT * FROM users`
    );
    return result.rows;
  };

  /** Get: get user by username
   *
   * returns {username,
   *          first_name,
   *          last_name,
   *          phone,
   *          join_at,
   *          last_login_at } */

  static async get(username) {
    const result = await db.query(
      `SELECT * FROM users WHERE username = $1`,
      [username]
    );

    const user = result.rows[0];
    if (!user) { throw new ExpressError('User not found', 404); }
    return user;
  };

  /** Return messages from this user.
   *
   * [{id, to_user, body, sent_at, read_at}]
   *
   * where to_user is
   *   {username, first_name, last_name, phone}
   */

  static async messagesFrom(username) {
    const result = await db.query(
      `SELECT * FROM messages WHERE from_username = $1`,
      [username]
    );

    return result.rows;
  };

  /** Return messages to this user.
   *
   * [{id, from_user, body, sent_at, read_at}]
   *
   * where from_user is
   *   {username, first_name, last_name, phone}
   */

  static async messagesTo(username) {
    const result = await db.query(
      `SELECT * FROM messages WHERE to_username = $1`,
      [username]
    );

    return result.rows;
  };
};


module.exports = User;