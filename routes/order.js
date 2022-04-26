var express = require('express');
var router = express.Router();

// ==================================================
// Route to list all records. Display view to list all records
// ==================================================
router.get('/', function(req, res, next) {
    let query = "SELECT id, invoice_id, product_id, promotion_id, quantity, total FROM saleorder";
    // execute query
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        }
    res.render('order/allrecords', {allrecs: result });
    });
});

// ==================================================
// Route to view one specific record. Notice the view is one record
// ==================================================
router.get('/:recordid/show', function(req, res, next) {
    let query = "SELECT id, invoice_id, product_id, promotion_id, quantity, total FROM saleorder WHERE id = " + req.params.recordid;
    // execute query
    db.query(query, (err, result) => {
        if (err) {
        console.log(err);
        res.render('error');
        } else {
            res.render('order/onerec', {onerec: result[0] });
        }
    });
});

// ==================================================
// Route to show empty form to obtain input form end-user.
// ==================================================
router.get('/addrecord', function(req, res, next) {
    res.render('order/addrec');
});

// ==================================================
// Route to obtain user input and save in database.
// ==================================================
router.post('/', function(req, res, next) {
    let insertquery = "INSERT INTO saleorder (invoice_id, product_id, promotion_id, quantity, total) VALUES (?, ?, ?, ?, ?)";

    // Set promotion to null if promotion_id == ''
    var promotion = req.body.promotion_id || null;

    db.query(insertquery,[req.body.invoice_id, req.body.product_id, promotion, req.body.quantity, req.body.total], (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        } else {
            res.redirect('/order');
        }
    });
});

// ==================================================
// Route to edit one specific record.
// ==================================================
router.get('/:recordid/edit', function(req, res, next) {
    let query = "SELECT id, invoice_id, product_id, promotion_id, quantity, total FROM saleorder WHERE id = " + req.params.recordid;
    // execute query
    db.query(query, (err, result) => {
        if (err) {
        console.log(err);
        res.render('error');
        } else {
            res.render('order/editrec', {onerec: result[0] });
        }
    });
});

// ==================================================
// Route to save edited data in database.
// ==================================================
router.post('/save', function(req, res, next) {
    let updatequery = "UPDATE saleorder SET invoice_id = ?, product_id = ?, promotion_id = ?, quantity = ?, total = ? WHERE id = " + req.body.id;

    // Set promotion to null if promotion_id == ''
    var promotion = req.body.promotion_id || null;

    db.query(updatequery,[req.body.invoice_id, req.body.product_id, promotion, req.body.quantity, req.body.total], (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        } else {
            res.redirect('/order');
        }
    });
});

// ==================================================
// Route to delete one specific record.
// ==================================================
router.get('/:recordid/delete', function(req, res, next) {
    let query = "DELETE FROM saleorder WHERE id = " + req.params.recordid;
    // execute query
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        } else {
            res.redirect('/order');
        }
    });
});

module.exports = router;
