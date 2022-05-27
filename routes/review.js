var express = require('express');
var router = express.Router();

function checkAdmin(req, res, next) {
    if (!req.session.is_admin){
        return res.redirect("/user/login");
    }
    next();
}


// ==================================================
// Route to list all records. Display view to list all records
// ==================================================
router.get('/', checkAdmin, function(req, res, next) {
    let query = "SELECT id, user_id, product_id, rating, comment, review_date, public FROM review";
    // execute query
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        }
    res.render('review/allrecords', {allrecs: result });
    });
});

// ==================================================
// Route to view one specific record. Notice the view is one record
// ==================================================
router.get('/:recordid/show', checkAdmin, function(req, res, next) {
    let query = "SELECT id, user_id, product_id, rating, comment, review_date, public FROM review WHERE id = " + req.params.recordid;
    // execute query
    db.query(query, (err, result) => {
        if (err) {
        console.log(err);
        res.render('error');
        } else {
            res.render('review/onerec', {onerec: result[0] });
        }
    });
});

// ==================================================
// Route to show empty form to obtain input form end-user.
// ==================================================
router.get('/addrecord', checkAdmin, function(req, res, next) {
    res.render('review/addrec');
});

// ==================================================
// Route to obtain user input and save in database.
// ==================================================
router.post('/', function(req, res, next) {
    let insertquery = "INSERT INTO review (user_id, product_id, rating, comment, review_date, public) VALUES (?, ?, ?, ?, ?, ?)";
    db.query(insertquery,[req.body.user_id, req.body.product_id, req.body.rating, req.body.comment, req.body.review_date, req.body.public], (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        } else {
            res.redirect('/review');
        }
    });
});

// ==================================================
// Route to edit one specific record.
// ==================================================
router.get('/:recordid/edit', checkAdmin, function(req, res, next) {
    let query = "SELECT id, user_id, product_id, rating, comment, review_date, public FROM review WHERE id = " + req.params.recordid;
    // execute query
    db.query(query, (err, result) => {
        if (err) {
        console.log(err);
        res.render('error');
        } else {
            res.render('review/editrec', {onerec: result[0] });
        }
    });
});

// ==================================================
// Route to save edited data in database.
// ==================================================
router.post('/save', checkAdmin, function(req, res, next) {
    let updatequery = "UPDATE review SET user_id = ?, product_id = ?, rating = ?, comment = ?, review_date = ?, public = ? WHERE id = " + req.body.id;
    db.query(updatequery,[req.body.user_id, req.body.product_id, req.body.rating, req.body.comment, req.body.review_date, req.body.public], (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        } else {
            res.redirect('/review');
        }
    });
});

// ==================================================
// Route to delete one specific record.
// ==================================================
router.get('/:recordid/delete', checkAdmin, function(req, res, next) {
    let query = "DELETE FROM review WHERE id = " + req.params.recordid;
    // execute query
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        } else {
            res.redirect('/review');
        }
    });
});

module.exports = router;
