const knex = require('../../db/knex');

module.exports = (limit) => {
  if(limit === undefined) {
    return knex('books').select();
  }
  return knex('books').select().limit(limit);
}
