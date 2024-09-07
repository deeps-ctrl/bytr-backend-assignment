const { getBooks, getBookById, addBook } = require('../book');

describe('Books functions', () => {
  it('should get all books', () => {
    const books = getBooks();
    expect(books.length).toBe(4);
    expect(books).toEqual([
      { id: 1, title: '1984', author: 'George Orwell' },
      { id: 2, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
      { id: 3, title: 'Pride and Prejudice', author: 'Jane Austen' },
      { id: 4, title: 'To Kill a Mockingbird', author: 'Harper Lee' },
    ]);
  });

  it('should get a book by id', () => {
    const book = getBookById(1);
    expect(book).toEqual({ id: 1, title: '1984', author: 'George Orwell' });
  });

  it('should return undefined for a non-existant book', () => {
    const book = getBookById(99);
    expect(book).toBeUndefined();
  });

  it('should add a new book', () => {
    const newBook = { title: 'New Book', author: 'New Author' };
    const addedBook = addBook(newBook);
    expect(addedBook).toEqual({
      id: 5,
      title: 'New Book',
      author: 'New Author',
    });
    const books = getBooks();
    expect(books.length).toBe(5);
  });
});
