exports.allAuthors                 = require('./knexQueries/get_all_authors');
exports.authorByName               = require('./knexQueries/get_author_by_name');
exports.byAuthorId                 = require('./knexQueries/get_author_by_id');

exports.allBooks                   = require('./knexQueries/get_all_books');
exports.bookByTitle                = require('./knexQueries/get_book_by_title');
exports.booksByGenre               = require('./knexQueries/get_books_by_genre');
exports.booksById                  = require('./knexQueries/get_books_by_id');
exports.booksWithAuthors           = require('./knexQueries/get_all_books_and_authors');

exports.booksByAuthor              = require('./knexQueries/get_books_by_author');
exports.authorsByBook              = require('./knexQueries/get_authors_by_book');
