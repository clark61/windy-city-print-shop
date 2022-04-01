var express = require('express');
var router = express.Router();

/* Get about page */
router.get('/', function(req, res, next) {
    res.render('contact', {title: 'Contact Windy City Print Shop'});
});

module.exports = router;
