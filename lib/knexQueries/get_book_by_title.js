const knex = require('../../db/knex');

module.exports = (title) => {
  return knex('books').whereRaw('LOWER(title) LIKE ?', '%' + title + '%');
}
