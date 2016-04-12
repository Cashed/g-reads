const express = require('express');
const router = express.Router();
const query = require('../lib/queries');
const validation = require('../lib/validations')

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Galvanize Reads', author: '', book: '' });
});

module.exports = router;
