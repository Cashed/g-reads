const knex =  require('../../db/knex');

module.exports = (book) => {
  return knex('books').where({ id: book.id }).update({ title: book.title, genre: book.genre, description: book.description, url: book.url }).returning('*');
}
