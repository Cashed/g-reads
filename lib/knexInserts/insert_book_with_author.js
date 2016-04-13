const knex =  require('../../db/knex');
const insert_into_bookTable = require('insert_book');
const insert_into_authTable =  require('insert_author');
const insert_into_joinTable = require('book_auth_insert');

module.exports = (books, authors) => {
  insert_into_bookTable(books).then((book) => {
    insert_into_authTable(authors).then((author) => {
      insert_into_joinTable(author, book);
    });
  });
}
