var express = require('express');
var router = express.Router();

/* Get about page */
router.get('/', function(req, res, next) {
    res.render('about', {title: 'About Windy City Print Shop'});
});

module.exports = router;
