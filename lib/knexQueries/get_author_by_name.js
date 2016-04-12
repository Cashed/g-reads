const knex = require('../../db/knex');

module.exports = (authorName) => {
  const name =  authorName.split(' ');
  var firstName;
  var lastName;

  if (name.length > 2) {
    firstName = name[0] + name[1];
    lastName = name[2];
  }
  else {
    firstName = name[0];
    lastName = name[1];
  }

  console.log(firstName + ' ' + lastName);

  return knex('authors').whereRaw('LOWER(first) LIKE ?', firstName, 'AND', 'LOWER(last) LIKE ?', lastName);
}
