const knex = require('../../db/knex');

module.exports = (genre) => {
  return knex('books').where({ genre: genre });
}
