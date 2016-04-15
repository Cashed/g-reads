const express = require('express');
const router = express.Router();


/* GET home page. */
router.get('/', (req, res, next) => {
  var user;

  if (req.session.user) {
    user = req.session.user.username;
  }
  res.render('index', { title: 'Galvanize Reads', author: {}, book: {}, user: user });
});

module.exports = router;
