const knex = require('../../db/knex');

module.exports = () => {
  return knex('messages').select();
}
