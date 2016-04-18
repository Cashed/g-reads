const knex =  require('../../db/knex');

module.exports = (title) => {
  return knex('books').insert({ title: title }).returning('*');
}
