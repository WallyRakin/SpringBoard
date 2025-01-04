const db = require("../db");


/** Collection of related methods for books. */

class Book {
  /** given an isbn, return book data with that isbn:
   *
   * => {isbn, amazon_url, author, language, pages, publisher, title, year}
   *
   **/

  static async findOne(isbn) {
    const bookRes = await db.query(
      `SELECT isbn,
                amazon_url,
                author,
                language,
                pages,
                publisher,
                title,
                year
            FROM books 
            WHERE isbn = $1`, [isbn]);

    if (bookRes.rows.length === 0) {
      throw { message: `There is no book with an isbn '${isbn}`, status: 404 }
    }

    return bookRes.rows[0];
  }

  /** Return array of book data:
   *
   * => [ {isbn, amazon_url, author, language,
   *       pages, publisher, title, year}, ... ]
   *
   * */

  static async findAll() {
    const booksRes = await db.query(
      `SELECT isbn,
                amazon_url,
                author,
                language,
                pages,
                publisher,
                title,
                year
            FROM books 
            ORDER BY title`);

    return booksRes.rows;
  }

  /** create book in database from data, return book data:
   *
   * {isbn, amazon_url, author, language, pages, publisher, title, year}
   *
   * => {isbn, amazon_url, author, language, pages, publisher, title, year}
   *
   * */

  static async create(data) {
    const result = await db.query(
      `INSERT INTO books (
            isbn,
            amazon_url,
            author,
            language,
            pages,
            publisher,
            title,
            year) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
         RETURNING isbn,
                   amazon_url,
                   author,
                   language,
                   pages,
                   publisher,
                   title,
                   year`,
      [
        data.isbn,
        data.amazon_url,
        data.author,
        data.language,
        data.pages,
        data.publisher,
        data.title,
        data.year
      ]
    );

    return result.rows[0];
  }

  /** Update data with matching ID to data, return updated book.

   * {isbn, amazon_url, author, language, pages, publisher, title, year}
   *
   * => {isbn, amazon_url, author, language, pages, publisher, title, year}
   *
   * */

  static async update(isbn, data) {
    const result = await db.query(
      `UPDATE books SET 
            amazon_url=($1),
            author=($2),
            language=($3),
            pages=($4),
            publisher=($5),
            title=($6),
            year=($7)
            WHERE isbn=$8
        RETURNING isbn,
                  amazon_url,
                  author,
                  language,
                  pages,
                  publisher,
                  title,
                  year`,
      [
        data.amazon_url,
        data.author,
        data.language,
        data.pages,
        data.publisher,
        data.title,
        data.year,
        isbn
      ]
    );

    if (result.rows.length === 0) {
      throw { message: `There is no book with an isbn '${isbn}`, status: 404 }
    }

    return result.rows[0];
  }

  /** Partially update book data with matching ISBN.
  * 
  * This method only updates the fields provided in the data object.
  * 
  * @param {string} isbn - The ISBN of the book to update
  * @param {object} data - An object containing the fields to update
  * @returns {object} The updated book data
  * @throws {object} If no book with the given ISBN is found
  */
  static async partialUpdate(isbn, data) {
    // Start building the query
    let query = ['UPDATE books'];
    let set = [];
    let values = [];
    let idx = 1;

    // For each field in data, add it to the SET clause
    for (let key in data) {
      set.push(`${key}=$${idx}`);
      values.push(data[key]);
      idx += 1;
    }

    // Add the WHERE clause
    values.push(isbn);
    query.push(`SET ${set.join(', ')}`);
    query.push(`WHERE isbn=$${idx}`);
    query.push('RETURNING isbn, amazon_url, author, language, pages, publisher, title, year');
    // Execute the query
    const result = await db.query(query.join(' '), values);

    if (result.rows.length === 0) {
      throw { message: `There is no book with an isbn '${isbn}'`, status: 404 };
    }
    return result.rows[0];
  }

  /** remove book with matching isbn. Returns undefined. */

  static async remove(isbn) {
    const result = await db.query(
      `DELETE FROM books 
         WHERE isbn = $1 
         RETURNING isbn`,
      [isbn]);

    if (result.rows.length === 0) {
      throw { message: `There is no book with an isbn '${isbn}`, status: 404 }
    }
  }
}


module.exports = Book;
