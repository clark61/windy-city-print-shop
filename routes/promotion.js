var express = require('express');
var router = express.Router();

// ==================================================
// Route to list all records. Display view to list all records
// ==================================================
router.get('/', function(req, res, next) {
    let query = "SELECT id, percent_off, description, title, start_date, end_date FROM promotion";
    // execute query
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        }
    res.render('promotion/allrecords', {allrecs: result });
    });
});

// ==================================================
// Route to view one specific record. Notice the view is one record
// ==================================================
router.get('/:recordid/show', function(req, res, next) {
    let query = "SELECT id, percent_off, description, title, start_date, end_date FROM promotion WHERE id = " + req.params.recordid;
    // execute query
    db.query(query, (err, result) => {
        if (err) {
        console.log(err);
        res.render('error');
        } else {
            res.render('promotion/onerec', {onerec: result[0] });
        }
    });
});

// ==================================================
// Route to show empty form to obtain input form end-user.
// ==================================================
router.get('/addrecord', function(req, res, next) {
    res.render('promotion/addrec');
});

// ==================================================
// Route to obtain user input and save in database.
// ==================================================
router.post('/', function(req, res, next) {
    let insertquery = "INSERT INTO promotion (percent_off, description, title, image, start_date, end_date) VALUES (?, ?, ?, ?, ?, ?)";
    db.query(insertquery,[req.body.percent_off, req.body.description, req.body.title, req.body.image, req.body.start_date, req.body.end_date], (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        } else {
            res.redirect('/promotion');
        }
    });
});

// ==================================================
// Route to edit one specific record.
// ==================================================
router.get('/:recordid/edit', function(req, res, next) {
    let query = "SELECT id, percent_off, description, title, image, start_date, end_date FROM promotion WHERE id = " + req.params.recordid;
    // execute query
    db.query(query, (err, result) => {
        if (err) {
        console.log(err);
        res.render('error');
        } else {
            res.render('promotion/editrec', {onerec: result[0] });
        }
    });
});

// ==================================================
// Route to save edited data in database.
// ==================================================
router.post('/save', function(req, res, next) {
    let updatequery = "UPDATE promotion SET percent_off = ?, description = ?, title = ?, image = ?, start_date = ?, end_date = ? WHERE id = " + req.body.id;
    db.query(updatequery,[req.body.percent_off, req.body.description, req.body.title, req.body.image, req.body.start_date, req.body.end_date], (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        } else {
            res.redirect('/promotion');
        }
    });
});

// ==================================================
// Route to delete one specific record.
// ==================================================
router.get('/:recordid/delete', function(req, res, next) {
    let query = "DELETE FROM promotion WHERE id = " + req.params.recordid;
    // execute query
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        } else {
            res.redirect('/promotion');
        }
    });
});

module.exports = router;
