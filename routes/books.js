const express = require('express');
const router = express.Router();
const query = require('../lib/queries');
const valid = require('../lib/validations');
const insert = require('../lib/inserts');
const knex = require('../db/knex');


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
    res.render('books/book_profile', { errors: error });
  });
});

router.get('/add', (req, res, next) => {
  res.render('books/add_book');
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
    query.authorsByBook(books[0].id).then((authors) => {
      books[0].authors = authors;
      res.render('books/books', { books: books });
    });
  }).catch((error) => {
    res.render({ errors: error });
  });
});

// router.post('/add', (req, res, next) => {
//   const errors =  [];
//   const title = req.body.title;
//   const genre = req.body.genre;
//   const description =  req.body.description;
//   const url = req.body.img_url;
//   const authors = req.body.authors;
//
//   if (!valid.book(title)) {
//     errors.push({ message: 'title not in valid format (alpha, digits, ,.\'-:)' });
//   }
//   if (!valid.genre(genre)) {
//     errors.push({ message: 'genre not valid (alpha only)' });
//   }
//   if(!valid.description(description)) {
//     errors.push({ message: 'description not valid (180 characters max)' });
//   }
//   if(!valid.url(url)) {
//     errors.push({ message: 'url not valid (make sure to include correct format, such as http://...)' });
//   }
//
//   authors.forEach((author) => {
//     if(!valid.author(author)) {
//       errors.push({ message: 'author name not valid'});
//     }
//   });
//
//   const book = {
//     title: title,
//     genre: genre,
//     description: description,
//     url: img_url
//     authors: authors
//   }
//
//   insert.book(book).then((book) => {
//     res.redirect('/');
//   })
//   .catch((error) => {
//     console.log('there was an error');
//     res.render('books/add_book', { errors: error });
//   });
//
//   Pr
// });


module.exports = router;
