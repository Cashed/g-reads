const knex = require('../../db/knex');

module.exports =  (authorId) => {
  return knex('books-authors').pluck('book_id').where({ author_id: authorId }).then((bookIds) => {
    return knex('books').whereIn('id', bookIds);
  });
}
