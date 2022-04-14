var express = require('express');
var router = express.Router();

/* Get help page */
router.get('/', function(req, res, next) {
    res.render('about', {title: 'Help'});
});

module.exports = router;
