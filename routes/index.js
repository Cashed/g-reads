var express = require('express');
var router = express.Router();
var queries = require('../lib');

/* GET home page. */
router.get('/', (req, res, next) => {
  queries.listAuthors().then((authors) => {
    res.render('index', { title: 'Galvanize Reads', authors: authors });
  });
});

module.exports = router;
