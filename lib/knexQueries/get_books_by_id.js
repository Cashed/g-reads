const knex = require('../../db/knex');

module.exports = (bookId) => {
  return knex('books').where({ id: bookId }).first();
}
