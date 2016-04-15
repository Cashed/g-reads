const express = require('express');
const router = express.Router();
const query = require('../lib/queries');
const valid = require('../lib/validations');

const ensureLoggedIn = function(req, res, next) {
  if (req.session.user) {
    next();
  }
  else {
    res.redirect('/');
  }
}

router.get('/', (req, res, next) => {
  query.allAuthors().then((authors) => {
    var promises = [];

    for (var i = 0; i < authors.length; i++) {
      promises.push(query.booksByAuthor(authors[i].id));
    }

    Promise.all(promises).then((books) => {
      for (var i = 0; i < authors.length; i++) {
        authors[i].books = books[i];
      }
      res.render('authors/authors', { authors: authors });
    });
  }).catch((error) => {
    res.render('authors/authors', { errors: error });
  });
});

router.get('/add', ensureLoggedIn, (req, res, next) => {
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
    console.log(author);
    query.booksByAuthor(author[0].id).then((book) => {
      author[0].books = book;
      res.render('authors/authors', { authors: author });
    });
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
