const knex = require('../../db/knex');

module.exports = (limit) => {
  if (limit === undefined) {
    return knex('authors').select();
  }

  return knex('authors').select().limit(limit);
}
