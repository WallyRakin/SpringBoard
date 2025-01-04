const express = require("express");
const Book = require("../models/book");
const jsonschema = require("jsonschema");
const bookCreate = require("../schemas/bookCreate.json");
const bookDelete = require("../schemas/bookDelete.json");
const bookIsbn = require("../schemas/bookIsbn.json");
const bookPatch = require("../schemas/bookPatch.json");

const router = new express.Router();
const ExpressError = require("../expressError");


/** GET / => {books: [book, ...]}  */

router.get("/", async function (req, res, next) {
  try {
    const books = await Book.findAll();
    return res.json({ books });
  } catch (err) {
    return next(err);
  }
});

/** GET /[isbn]  => {book: book} */

router.get("/:isbn", async function (req, res, next) {
  try {
    const validateIsbn = jsonschema.validate(req.params, bookIsbn);
    if (!validateIsbn.valid)
      return next(new ExpressError(validateIsbn.errors.map(error => error.stack), 404));

    return res.json(Object.assign({}, await Book.findOne(req.params.isbn)));
  } catch (err) {
    return next(err);
  }
});

/** POST /   bookData => {book: newBook}  */

router.post("/", async function (req, res, next) {
  try {
    const validateBookCreate = jsonschema.validate(req.body, bookCreate);
    if (!validateBookCreate.valid)
      return next(new ExpressError(validateBookCreate.errors.map(error => error.stack), 404));

    return res.status(201).json(Object.assign({}, await Book.create(req.body)));
  } catch (err) {
    return next(err);
  }
});

/** PUT /[isbn]   bookData => {book: updatedBook}  */

router.put("/:isbn", async function (req, res, next) {
  try {
    const validateBookPut = jsonschema.validate(Object.assign({}, req.params, req.body), bookCreate);

    if (!validateBookPut.valid)
      return next(new ExpressError(validateBookPut.errors.map(error => error.stack), 404));

    const book = await Book.update(req.params.isbn, req.body);

    return res.json({ book });
  } catch (err) {
    return next(err);
  }
});

/** PATCH /[isbn]   bookData => {book: updatedBook}  */

router.patch("/:isbn", async function (req, res, next) {
  try {
    const validateBookPatch = jsonschema.validate(req.body, bookPatch);
    if (!validateBookPatch.valid) {
      return next(new ExpressError(validateBookPatch.errors.map(error => error.stack), 400));
    }

    const book = await Book.partialUpdate(req.params.isbn, req.body);
    return res.json({ book });
  } catch (err) {
    return next(err);
  }
});

/** DELETE /[isbn]   => {message: "Book deleted"} */

router.delete("/:isbn", async function (req, res, next) {
  try {
    const verifyDeleteInput = jsonschema.validate(req.params, bookDelete);
    if (!verifyDeleteInput.valid)
      return next(new ExpressError(verifyDeleteInput.errors.map(error => error.stack), 404));

    await Book.remove(req.params.isbn);
    return res.json({ message: "Book deleted" });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
