const knex =  require('../../db/knex');

module.exports = (book) => {
  return knex('books').insert({ title: book.title, genre: book.genre, description: book.description, url: book.url });
}
