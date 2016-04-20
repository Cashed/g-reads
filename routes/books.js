const express = require('express');
const router = express.Router();
const query = require('../lib/queries');
const valid = require('../lib/validations');
const insert = require('../lib/inserts');
const knex = require('../db/knex');

const ensureLoggedIn = function(req, res, next) {
  if (req.session.user) {
    next();
  }
  else {
    res.redirect('/');
  }
}

router.get('/', (req, res, next) => {
  query.allBooks().then((books) => {
    var promises = [];

    for (var i = 0; i < books.length; i++) {
      promises.push(query.authorsByBook(books[i].id));
    }

    Promise.all(promises).then((authors) => {
      for (var i = 0; i < books.length; i++) {
        books[i].authors = authors[i];
      }
      res.render('books/books', { books: books });
    });
  }).catch((error) => {
    res.render('books/books', { errors: error })
  });
});

router.get('/book_profile/:bookId', (req, res, next) => {
  const bookId = req.params.bookId;

  query.booksById(bookId).then((book) => {
    query.authorsByBook(bookId).then((authors) => {
      res.render('books/book_profile', { book: book, authors: authors });
    });
  }).catch((error) => {
    res.render('books/book_profile', { book: {}, authors: {}, errors: error });
  });
});

router.get('/add', ensureLoggedIn, (req, res, next) => {
  query.allAuthors().then((authors) => {
    res.render('books/add_book', { book: {}, bookAuthors: {}, authors: authors });
  }).catch((error) => {
    res.render('books/add_book', { book: {}, authors: {}, errors: error })
  });
});

router.get('/edit/:bookId', ensureLoggedIn, (req, res, next) => {
  const id = req.params.bookId;

  query.booksById(id).then((book) => {
    query.authorsByBook(book.id).then((authors) => {
      query.allAuthors().then((allAuthors) => {
        res.render('books/edit_book', { book: book, bookAuthors: authors, authors: allAuthors });
      });
    });
  }).catch((error) => {
    res.render('books/edit_book', { book: {}, bookAuthors: {}, authors: {}, errors: error });
  });
});

router.get('/:bookSearch', (req, res, next) => {
  const errors = [];
  const title = req.params.bookSearch.toLowerCase();

  if(!valid.title(title)) {
    errors.push('not a valid title (ex: the mysterious stranger)');
  }

  if(errors.length) {
    res.render('index', { errors: errors });
    return;
  }

  query.bookByTitle(title).then((books) => {
    if (books) {
      var promises = [];
      for (var i = 0; i < books.length; i++) {
        promises.push(query.authorsByBook(books[i].id));
      }

      Promise.all(promises).then((authors) => {
        for (var i = 0; i < books.length; i++) {
          books[i].authors = authors[i];
        }

        res.render('books/books', { books: books });
      });
    }
    else {
      res.render('books/books');
    }
  }).catch((error) => {
    res.render('books/books', { errors: error });
  });
});

router.post('/add', ensureLoggedIn, (req, res, next) => {
  const errors =  [];
  const title = req.body.title;
  const genre = req.body.genre;
  const description = req.body.description;
  const url = req.body.img_url;
  const authors = req.body.authors.split("\r\n");

  if (!valid.title(title)) {
    errors.push('title not in valid format (alpha, digits, ,.\'-:)');
  }
  if (!valid.genre(genre)) {
    errors.push({ message: 'genre not valid (alpha only)' });
  }
  if(!valid.description(description)) {
    errors.push('description not valid (180 characters max)');
  }
  if(!valid.url(url)) {
    errors.push('url not valid (make sure to include correct format, such as http://...)');
  }

  const book = {
    title: title,
    genre: genre,
    description: description,
    url: url
  }

  insert.book(book).then((book) => {
    var promises = [];

    for (var i = 0; i < authors.length-1; i++) {
      promises.push(query.authorByName(authors[i]));
    }

    Promise.all(promises).then((authors) => {
      const author = authors[0];
      var insertPromises = [];

      for (var i = 0; i < author.length; i++) {
        insertPromises.push(insert.joinTable(author[i].id, book[0].id));
      }

      Promise.all(insertPromises).then((inserts) => {
        res.redirect(`/books/book_profile/${book[0].id}`);
      })
    });
  })
  .catch((error) => {
    res.render('books/add_book', { errors: [error] });
  });

});


module.exports = router;
