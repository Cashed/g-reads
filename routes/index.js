const express = require('express');
const router = express.Router();
const query = require('../lib/queries');
const insert = require('../lib/inserts');


/* GET home page. */
router.get('/', (req, res, next) => {
  var user;

  if (req.session.user) {
    user = req.session.user.username;
  }

  res.render('index', { title: 'Galvanize Reads', user: user });
});

router.get('/guestbook', (req, res, next) => {
  query.messages().then((messages) => {
    console.log(messages);
    res.render('guestbook', { messages: messages });
  });
});

router.post('/guestbook', (req, res, next) => {
  const name = req.body.name;
  const message =  req.body.message;
  console.log(name + ' ' + message);

  insert.messages(name, message).then((message) => {
    res.redirect('guestbook');
  });
});

module.exports = router;
