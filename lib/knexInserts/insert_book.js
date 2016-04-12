const knex =  require('../../db/knex');

module.exports = (title, genre, description, url) => {
  knex('books').insert({ title: title, genre: genre, description: description, url: url });
  });
}
