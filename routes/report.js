var express = require('express');
var router = express.Router();

/* Get report page */
router.get('/', function(req, res, next) {
    res.render('report/reportmenu');
});

router.get('/customer', function(req, res, next) {
    let query = "SELECT id, user_name, first_name, last_name, email, address_1, address_2, city, state, zip FROM user";
    // execute query
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        }
        res.render('report/customerlist', {allrecs: result});
    });
});

router.get('/product', function(req, res, next) {
    let query = "SELECT id, product_name, product_type, price, dimensions FROM product";
    // execute query
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        }
    res.render('report/productlist', {allrecs: result });
    });
});

router.get('/sale', function(req, res, next) {
    let query = "SELECT id, invoice_id, product_id, promotion_id, quantity, total FROM saleorder";
    // execute query
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        }
    res.render('report/salelist', {allrecs: result });
    });
});

module.exports = router;
