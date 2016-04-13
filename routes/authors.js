const express = require('express');
const router = express.Router();
const query = require('../lib/queries');
const valid = require('../lib/validations');

router.get('/', (req, res, next) => {
  query.allAuthors().then((authors) => {
    res.render('authors/authors', { authors: authors });
  });
});

router.get('/add', (req, res, next) => {
  res.render('authors/add_author');
});

router.get('/:authSearch', (req, res, next) => {
  const errors = [];
  const authName = (req.params.authSearch).toLowerCase();

  if (!valid.author(authName)) {
    errors.push('please enter valid author name (ex: mark twain)');
  }

  if (errors.length) {
    res.render('index', { errors: errors, author: authName });
    return;
  }

  query.authorByName(authName).then((author) => {
    res.render('authors/authors', { authors: author });
  });
});


router.get('/author_list/:bookId', (req, res, next) => {
  const bookId = req.params.bookId;

  query.authorsByBook(bookId).then((authors) => {
    res.render('authors/authors_list', { authors: authors });
  });
});

router.get('/profile/:authId', (req, res, next) => {
  const authId = req.params.authId;

  query.byAuthorId(authId).then((authors) => {
    query.booksByAuthor(authId).then((books) => {
      res.render('authors/profile', { authors: authors, books: books });
    });
  });
});

router.post('/add', (req, res, next) => {

});

module.exports = router;
