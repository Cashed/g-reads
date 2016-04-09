var knex = require('../db/knex');

module.exports = function () {
  return knex('authors').select();
}
