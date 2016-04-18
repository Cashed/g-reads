const knex =  require('../../db/knex');

module.exports = (name, message) => {
  return knex('messages').insert({ name: name, message: message });
}
