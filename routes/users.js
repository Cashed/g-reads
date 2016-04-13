const express = require('express');
const router = express.Router();
const user = require('../lib/users');
const valid = require('../lib/validations');

router.get('/create', (req, res, next) => {
  res.render('users/create_user');
});

router.post('/create', (req, res, next) => {
  const errors = [];
  const username = req.body.username;
  const password = req.body.password;

  if (!valid.username(username)) {
    error.push('username not valid (alpha characters only, min 4 count)');
  }

  if (!valid.password(password)) {
    error.push('password not valid (must contain at least 1 alpha and 1 digit, min 4 count)');
  }

  if (errors.length) {
    res.render('users/create_user', { errors: errors });
    return;
  }

  user.create(req.body, (error, data) => {
    if (error) {
      res.render('users/create_user', { errors: error })
      return;
    }
    res.send(data);
  });
});

module.exports =  router;
