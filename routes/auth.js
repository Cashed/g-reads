const express = require('express');
const router = express.Router();
const user = require('../lib/users');

router.get('/', (req, res, next) => {
  res.render('users/login');
});

router.get('/logout', (req, res, next) => {
  req.session.user = null;
  res.redirect('/');
});

router.post('/', (req, res, next) => {
  user.authenticate(req.body.username, req.body.password, (error, user) => {
    if (error) {
      res.render('users/login', { error: error });
    }
    else {
      req.session.user = user;
      res.redirect('/');
      console.log('successful login');
    }
  });
});

module.exports = router;
