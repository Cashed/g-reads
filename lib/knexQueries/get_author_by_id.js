const knex = require('../../db/knex');

module.exports =  (authId) => {
  return knex('authors').where({ id: authId });
}
