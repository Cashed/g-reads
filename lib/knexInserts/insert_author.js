const knex =  require('../../db/knex');

module.exports = (author) => {
  return knex('authors').insert({ first: author.first, last: author.last });
}
