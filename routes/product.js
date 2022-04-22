var express = require('express');
var router = express.Router();

// ==================================================
// Route to list all records. Display view to list all records
// ==================================================
router.get('/', function(req, res, next) {
    let query = "SELECT id, product_name, product_type, price, dimensions FROM product";
    // execute query
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        }
    res.render('product/allrecords', {allrecs: result });
    });
});

// ==================================================
// Route to view one specific record. Notice the view is one record
// ==================================================
router.get('/:recordid/show', function(req, res, next) {
    let query = "SELECT id, product_name, product_type, dimensions, price FROM product WHERE id = " + req.params.recordid;
    // execute query
    db.query(query, (err, result) => {
        if (err) {
        console.log(err);
        res.render('error');
        } else {
            res.render('product/onerec', {onerec: result[0] });
        }
    });
});

// ==================================================
// Route to show empty form to obtain input form end-user.
// ==================================================
router.get('/addrecord', function(req, res, next) {
    res.render('product/addrec');
});

// ==================================================
// Route to obtain user input and save in database.
// ==================================================
router.post('/', function(req, res, next) {
    let insertquery = "INSERT INTO product (product_name, product_type, dimensions, price, quantity) VALUES (?, ?, ?, ?, ?)";
    db.query(insertquery,[req.body.product_name, req.body.product_type, req.body.dimensions, req.body.price, req.body.quantity], (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        } else {
            res.redirect('/product');
        }
    });
});

// ==================================================
// Route to edit one specific record.
// ==================================================
router.get('/:recordid/edit', function(req, res, next) {
    let query = "SELECT id, product_name, product_type, dimensions, price, quantity FROM product WHERE id = " + req.params.recordid;
    // execute query
    db.query(query, (err, result) => {
        if (err) {
        console.log(err);
        res.render('error');
        } else {
            res.render('product/editrec', {onerec: result[0] });
        }
    });
});

// ==================================================
// Route to save edited data in database.
// ==================================================
router.post('/save', function(req, res, next) {
    let updatequery = "UPDATE product SET product_name = ?, product_type = ?, dimensions = ?, price = ?, quantity= ? WHERE id = " + req.body.id;
    db.query(updatequery,[req.body.product_name, req.body.product_type, req.body.dimensions, req.body.price, req.body.quantity], (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        } else {
            res.redirect('/product');
        }
    });
});

// ==================================================
// Route to delete one specific record.
// ==================================================
router.get('/:recordid/delete', function(req, res, next) {
    let query = "DELETE FROM product WHERE id = " + req.params.recordid;
    // execute query
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        } else {
            res.redirect('/product');
        }
    });
});

module.exports = router;
