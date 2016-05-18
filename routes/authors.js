const express = require('express');
const router = express.Router();
const query = require('../lib/queries');
const valid = require('../lib/validations');
const insert = require('../lib/inserts');
const update = require('../lib/updates');

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
  query.allBooks().then((allBooks) => {
    res.render('authors/add_author', { author: {}, authorBooks: {}, books: allBooks });
  });
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
    if(author[0]) {
      query.booksByAuthor(author[0].id).then((book) => {
        author[0].books = book;
        res.render('authors/authors', { authors: author });
      });
    }
    else {
      res.render('authors/authors');
    }
  });
});

router.get('/edit/:authId', ensureLoggedIn, (req, res, next) => {
  const id = req.params.authId;

  query.byAuthorId(id).then((author) => {
    var promises = [];

    for (var i = 0; i < author.length; i++) {
      promises.push(query.booksByAuthor(author[i].id));
    }

    Promise.all(promises).then((books) => {
      query.allBooks().then((allBooks) => {
        res.render('authors/edit_author', { author: author[0], authorBooks: books[0], books: allBooks });
      });
    });
  }).catch((error) => {
    res.render('authors/edit_author', { errors: error });
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

router.post('/add', ensureLoggedIn, (req, res, next) => {
  const errors =  [];
  const name = req.body.name;
  const portrait = req.body.portrait_url;
  const bio = req.body.bio;
  const books;
  if (req.body.books) {
    books = req.body.books.split("\r\n");
  }

  if (!valid.author(name)) {
    errors.push('name not in valid format (a-z ,.\'\-)');
  }
  if(!valid.description(bio)) {
    errors.push('description not valid');
  }
  if(!valid.url(portrait)) {
    errors.push('url not valid (make sure to include correct format, such as http://...)');
  }

  const author = {
    name: name,
    portrait: portrait,
    bio: bio
  }

  insert.author(author).then((author) => {
    if (books) {
      var promises = [];

      for (var i = 0; i < books.length-1; i++) {
        promises.push(query.bookByTitle(books[i]));
      }

      Promise.all(promises).then((books) => {
        const book = books[0];
        var insertPromises = [];
        for (var i = 0; i < book.length; i++) {
          insertPromises.push(insert.joinTable(author[0].id, book[i].id));
        }

        Promise.all(insertPromises).then((inserts) => {
          res.redirect(`/authors/profile/${author[0].id}`);
        })
      });
    }
    else {
      res.redirect(`/authors/profile/${author[0].id}`);
    }
  })
  .catch((error) => {
    res.render('authors/add_author', { errors: [error], author: {}, authorBooks: {}, books: {} });
  });

});

router.patch('/edit/:authId', ensureLoggedIn, (req, res, next) => {
  const name = req.body.name;
  const portrait = req.body.portrait_url;
  const bio = req.body.bio;
  const books = req.body.books.split("\r\n");

  if (!valid.author(name)) {
    errors.push('name not in valid format (a-z ,.\'\-)');
  }
  if(!valid.description(bio)) {
    errors.push('description not valid');
  }
  if(!valid.url(portrait)) {
    errors.push('url not valid (make sure to include correct format, such as http://...)');
  }

  const author = {
    name: name,
    portrait: portrait,
    bio: bio
  }

  update.author(author).then((author) => {
    var promises = [];

    for (var i = 0; i < books.length-1; i++) {
      promises.push(query.bookByTitle(books[i]));
    }

    Promise.all(promises).then((books) => {
      const book =  books[0];
      var insertPromises = [];

      for (var i = 0; i < book.length; i++) {
        insertPromises.push(update.joinTable(author[0].id, book[i].id));
      }

      Promise.all(insertPromises).then((updates) => {
        res.redirect(`/authors/profile/${author[0].id}`);
      });
    });
  }).catch((error) => {
    res.render(`authors/edit/${author[0].id}`, { errors: [error] })
  });

});

module.exports = router;
