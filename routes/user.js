var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');

// ==================================================
// Route to list all records. Display view to list all records
// ==================================================
router.get('/', function(req, res, next) {
    let query = "SELECT id, user_name, first_name, last_name, email, address_1, address_2, city, state, zip FROM user";
    // execute query
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        }
    res.render('user/allrecords', {allrecs: result });
    });
});

// ==================================================
// Route to view one specific record. Notice the view is one record
// ==================================================
router.get('/:recordid/show', function(req, res, next) {
    let query = "SELECT id, user_name, password, first_name, last_name, email, address_1, address_2, city, state, zip FROM user WHERE id = " + req.params.recordid;
    // execute query
    db.query(query, (err, result) => {
        if (err) {
        console.log(err);
        res.render('error');
        } else {
            res.render('user/onerec', {onerec: result[0] });
        }
    });
});

// ==================================================
// Route to show empty form to obtain input form end-user.
// ==================================================
router.get('/addrecord', function(req, res, next) {
    res.render('user/addrec');
});

// ==================================================
// Route to enable registration
// ==================================================
router.get('/register', function(req, res, next) {
    res.render('user/addrec');
});

// ==================================================
// Route to obtain user input and save in database.
// ==================================================
router.post('/', function(req, res, next) {
    let insertquery = "INSERT INTO user (user_name, password, first_name, last_name, email, address_1, address_2, city, state, zip) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
            if(err) { res.render('error');}
            db.query(insertquery,[req.body.user_name, hash, req.body.first_name, req.body.last_name, req.body.email, req.body.address_1, req.body.address_2, req.body.city, req.body.state, req.body.zip], (err, result) => {
                if (err) {
                    console.log(err);
                    res.render('error');
                } else {
                    res.redirect('/user');
                }
            });
        });
    });
});

// ==================================================
// Route Provide Login Window
// ==================================================
router.get('/login', function(req, res, next) {
    res.render('user/login', {message: "Please Login"});
});

// ==================================================
// Route Check Login Credentials
// ==================================================
router.post('/login', function(req, res, next) {
    let query = "select id, first_name, last_name, password from user WHERE user_name = '" + req.body.user_name + "'";
    // execute query
    db.query(query, (err, result) => {
        if (err) {res.render('error');}
        else {
            if(result[0]) {
                // Username was correct. Check if password is correct
                bcrypt.compare(req.body.password, result[0].password, function(err, result1) {
                    if(result1) {
                        // Password is correct. Set session variables for user.
                        var custid = result[0].id;
                        req.session.customer_id = custid;
                        res.redirect('/');
                    } else {
                        // password does not match
                        res.render('user/login', {message: "Wrong Password"});
                    }
                });
            }
            else {res.render('user/login', {message: "Wrong Username"});}
        }
    });
})

// ==================================================
// Route Check Login Credentials
// ==================================================
router.get('/logout', function(req, res, next) {
    req.session.customer_id = 0;
    req.session.cart=[];
    req.session.quantity=[];
    res.redirect('/');
});
    
// ==================================================
// Route to obtain user input and save in database.
// ==================================================
router.post('/', function(req, res, next) {
    let insertquery = "INSERT INTO user (user_name, password, first_name, last_name, email, address_1, address_2, city, state, zip) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    db.query(insertquery,[req.body.user_name, req.body.password, req.body.first_name, req.body.last_name, req.body.email, req.body.address_1, req.body.address_2, req.body.city, req.body.state, req.body.zip], (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        } else {
            res.redirect('/user');
        }
    });
});

// ==================================================
// Route to edit one specific record.
// ==================================================
router.get('/:recordid/edit', function(req, res, next) {
    let query = "SELECT id, user_name, password, first_name, last_name, email, address_1, address_2, city, state, zip FROM user WHERE id = " + req.params.recordid;
    // execute query
    db.query(query, (err, result) => {
        if (err) {
        console.log(err);
        res.render('error');
        } else {
            res.render('user/editrec', {onerec: result[0] });
        }
    });
});

// ==================================================
// Route to save edited data in database.
// ==================================================
router.post('/save', function(req, res, next) {
    let updatequery = "UPDATE user SET user_name = ?, password = ?, first_name = ?, last_name = ?, email = ?, address_1 = ?, address_2 = ?, city = ?, state = ?, zip = ? WHERE id = " + req.body.id;
    db.query(updatequery,[req.body.user_name, req.body.password, req.body.first_name, req.body.last_name, req.body.email, req.body.address_1, req.body.address_2, req.body.city, req.body.state, req.body.zip], (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        } else {
            res.redirect('/user');
        }
    });
});

// ==================================================
// Route to delete one specific record.
// ==================================================
router.get('/:recordid/delete', function(req, res, next) {
    let query = "DELETE FROM user WHERE id = " + req.params.recordid;
    // execute query
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        } else {
            res.redirect('/user');
        }
    });
});

module.exports = router;
