process.env.NODE_ENV = 'test';
const request = require('supertest');
const app = require('../app');
const db = require('../db');
const Book = require('../models/book');

jest.mock('../db', () => ({
    query: jest.fn(),
}));

describe('Books API', () => {
    beforeEach(async () => {
        jest.clearAllMocks();
        await db.query("DELETE FROM books");
    });

    it('GET / should return all books', async () => {
        const mockBooks = [{
            isbn: '978-3-16-148410-0',
            title: 'Test Book',
            amazon_url: 'https://www.amazon.com/test-book',
            author: 'Test Author',
            language: 'English',
            pages: 300,
            publisher: 'Test Publisher',
            year: 2023
        }];

        db.query.mockResolvedValueOnce({ rows: mockBooks });

        const response = await request(app).get('/books');

        expect(response.status).toBe(200);
        expect(response.body.books).toEqual(mockBooks);
    });

    it('GET /:isbn should return a single book', async () => {
        const mockBook = {
            isbn: '978-3-16-148410-0',
            title: 'Test Book',
            amazon_url: 'https://www.amazon.com/test-book',
            author: 'Test Author',
            language: 'English',
            pages: 300,
            publisher: 'Test Publisher',
            year: 2023
        };

        db.query.mockResolvedValueOnce({ rows: [mockBook] });
        await Book.create(mockBook);

        db.query.mockReset();
        db.query.mockResolvedValueOnce({ rows: [mockBook] });

        const response = await request(app).get('/books/978-3-16-148410-0');

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockBook);
    });

    it('POST / should create a new book', async () => {
        const newBook = {
            isbn: '978-3-16-148410-0',
            title: 'New Test Book',
            amazon_url: 'https://www.amazon.com/new-test-book',
            author: 'New Test Author',
            language: 'English',
            pages: 350,
            publisher: 'New Test Publisher',
            year: 2024
        };

        db.query.mockResolvedValueOnce({ rows: [newBook] });

        const response = await request(app)
            .post('/books')
            .send(newBook);

        expect(response.status).toBe(201);
        expect(response.body).toEqual(newBook);

        expect(db.query).toHaveBeenCalledWith(
            expect.stringContaining('INSERT INTO books'),
            expect.arrayContaining([
                newBook.isbn,
                newBook.amazon_url,
                newBook.author,
                newBook.language,
                newBook.pages,
                newBook.publisher,
                newBook.title,
                newBook.year
            ])
        );
    });

    it('PUT /:isbn should update an existing book', async () => {
        const existingBook = {
            isbn: '978-3-16-148410-0',
            title: 'Original Test Book',
            amazon_url: 'https://www.amazon.com/original-test-book',
            author: 'Original Test Author',
            language: 'English',
            pages: 300,
            publisher: 'Original Test Publisher',
            year: 2023
        };

        db.query.mockResolvedValueOnce({ rows: [existingBook] });

        const createBook = await request(app)
            .post('/books')
            .send(existingBook);

        expect(createBook.status).toBe(201);
        expect(createBook.body).toEqual(existingBook);

        const updatedBook = {
            ...existingBook,
            title: 'Updated Test Book',
            amazon_url: 'https://www.amazon.com/updated-test-book',
            author: 'Updated Test Author',
            pages: 400,
            publisher: 'Updated Test Publisher',
            year: 2025
        };

        db.query.mockResolvedValueOnce({ rows: [updatedBook] });

        const response = await request(app)
            .put(`/books/${existingBook.isbn}`)
            .send(updatedBook);

        expect(response.status).toBe(200);
        expect(response.body.book).toEqual(updatedBook);

        expect(db.query).toHaveBeenCalledWith(
            expect.stringContaining('UPDATE books SET'),
            expect.arrayContaining([
                updatedBook.amazon_url,
                updatedBook.author,
                updatedBook.language,
                updatedBook.pages,
                updatedBook.publisher,
                updatedBook.title,
                updatedBook.year,
                updatedBook.isbn
            ])
        );
    });

    it('PATCH /:isbn should partially update a book', async () => {
        const existingBook = {
            isbn: '978-3-16-148410-0',
            title: 'Original Test Book',
            amazon_url: 'https://www.amazon.com/original-test-book',
            author: 'Original Test Author',
            language: 'English',
            pages: 300,
            publisher: 'Original Test Publisher',
            year: 2023
        };

        // Mock the initial book creation
        db.query.mockResolvedValueOnce({ rows: [existingBook] });
        await Book.create(existingBook);

        // Reset the mock for the update operation
        db.query.mockReset();

        const partialUpdate = {
            title: 'Updated Test Book',
            pages: 350
        };

        const updatedBook = { ...existingBook, ...partialUpdate };

        // Mock the partial update query response
        db.query.mockResolvedValueOnce({ rows: [updatedBook] });

        const response = await request(app)
            .patch(`/books/${existingBook.isbn}`)
            .send(partialUpdate);

        expect(response.status).toBe(200);
        expect(response.body.book).toEqual(updatedBook);

        expect(db.query).toHaveBeenCalledWith(
            expect.stringContaining('UPDATE books SET'),
            expect.arrayContaining([
                partialUpdate.title,
                partialUpdate.pages,
                existingBook.isbn
            ])
        );
    });

    it('DELETE /:isbn should delete a book', async () => {
        const mockResponse = { isbn: '978-3-16-148410-0' };

        db.query.mockResolvedValueOnce({ rows: [mockResponse] });

        const response = await request(app).delete('/books/978-3-16-148410-0');

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Book deleted');
    });
});