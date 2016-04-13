const knex = require('../../db/knex');

module.exports = () => {
  return knex.from('books-authors').innerJoin('authors', 'books-authors.author_id', 'authors.id').innerJoin('books', 'books-authors.book_id', 'books.id');
}
