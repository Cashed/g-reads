const knex = require('../../db/knex');

module.exports = (authorName) => {
  return knex('authors').whereRaw("first || ' ' || last ILIKE ?", '%' + authorName + '%');
}
