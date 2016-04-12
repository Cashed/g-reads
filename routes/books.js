const express = require('express');
const router = express.Router();
const query = require('../lib/queries');
const validation = require('../lib/validations');

router.get('/', (req, res, next) => {
  query.allBooks().then((books) => {
    res.render('books', { books: books });
  });
});

router.get('/book_profile/:bookId', (req, res, next) => {
  const bookId = req.params.bookId;

  query.booksById(bookId).then((book) => {
    query.authorsByBook(bookId).then((authors) => {
      res.render('book_profile', { book: book, authors: authors });
    });
  });
});

router.get('/:bookSearch', (req, res, next) => {
  const errors = [];
  const title = req.params.bookSearch.toLowerCase();

  if(!validation.titleIsValid(title)) {
    errors.push('not a valid title (ex: the mysterious stranger)');
  }

  if(errors.length) {
    res.render('index', { errors: errors });
    return;
  }

  query.bookByTitle(title).then((books) => {
    res.render('books', { books: books });
  });
});


module.exports = router;
