const knex = require('../db/knex');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

function user() {
  return knex('users');
}

user.create = (data, callback) => {
  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) {
      callback(err);
    }

    bcrypt.hash(data.password, salt, (err, hash) => {
      if (err) {
        callback(err);
      }

      data.password_digest = hash;
      delete data.password;
      user().insert(data, '*').then((data) => {
        callback(undefined, data);
      });
    });
  });
}

user.authenticate = (username, password, callback) => {
  user().where({ username: username }).first().then(user => {
    if (!user) {
      return callback("username and password don't match");
    }
    bcrypt.compare(password, user.password_digest, (err, isMatch) => {
      if (err || !isMatch) {
        return callback("username and password don't match");
      } else {
        return callback(undefined, user);
      }
    });
  });
}

module.exports = user;
