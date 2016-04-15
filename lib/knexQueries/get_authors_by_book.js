const knex = require('../../db/knex');

module.exports =  (bookId) => {
  return knex('books-authors').pluck('author_id').where({ book_id: bookId }).then((authIds) => {
    return knex('authors').whereIn('id', authIds);  
  });
}
