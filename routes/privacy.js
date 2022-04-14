var express = require('express');
var router = express.Router();

/* Get privacy page */
router.get('/', function(req, res, next) {
    res.render('privacy', {title: 'Privacy Policy'});
});

module.exports = router;
