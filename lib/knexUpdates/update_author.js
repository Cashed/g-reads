const knex =  require('../../db/knex');

module.exports = (author) => {
  const name = author.name.split(' ');
  var first = '';
  var last = '';

  first += name[0];

  for (var i = 1; i < name.length - 1; i++) {
    first += ' ' + name[i];
  }

  last = name[name.length - 1];

  return knex('authors').where({ id: author.id }).update({ first: first, last: last, bio: author.bio, url: author.url }).returning('*');
}
