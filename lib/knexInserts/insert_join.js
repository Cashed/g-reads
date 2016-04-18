const knex =  require('../../db/knex');

module.exports = (author_id, book_id) => {
  return knex('books-authors').insert({ author_id: author_id, book_id: book_id }).returning('*');
}
