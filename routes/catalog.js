var express = require('express');
var router = express.Router();

// ==================================================
// Route to list all products on the catalog
// ==================================================
router.get('/', function(req, res, next) {
    let query = "SELECT id, product_name, product_type, price, dimensions FROM product";
    // execute query
    db.query(query, (err, result) => {
        if (err) {
            res.redirect('/');
        }
        res.render('catalog', {allrecs: result });
    });
});

// ==================================================
// Route to add an item to the cart
// ==================================================
router.post('/add', function(req, res, next) {
    if (typeof req.session.cart !== 'undefined' && req.session.cart ) {
        if (req.session.cart.includes(req.body.id)) {
            // Item Exists in Basket - Increase Quantity
            var n = req.session.cart.indexOf(req.body.id);
            req.session.quantity[n] = parseInt(req.session.quantity[n]) +
            parseInt(req.body.quantity);
        } else {
            // Item Being Added First Time
            req.session.cart.push(req.body.id);
            req.session.quantity.push(req.body.quantity);
        }
    } else {
        var cart = [];
        cart.push(req.body.id);
        req.session.cart = cart;
        var quantity = [];
        quantity.push(req.body.quantity);
        req.session.quantity = quantity;
    }
    res.redirect('/catalog/cart');
});

// ==================================================
// Route to remove an item from the cart
// ==================================================
router.post('/remove', function(req, res, next) {
    // Find the element index of the id that needs to be removed
    var n = req.session.cart.indexOf(req.body.id);
    // Remove element from cart and quantity arrays
    req.session.cart.splice(n,1);
    req.session.quantity.splice(n,1);
    res.redirect('/catalog/cart');
});

// ==================================================
// Route to show shopping cart
// ==================================================
router.get('/cart', function(req, res, next) {
    if (!Array.isArray(req.session.cart) || !req.session.cart.length){
        res.render('cart', {cartitems: 0 });
    } else {
        let query = "SELECT id, product_name, product_type, price, dimensions FROM product WHERE id IN (" + req.session.cart + ") order by find_in_set(id, '" + req.session.cart + "');";
        // execute query
        db.query(query, (err, result) => {
            if (err) {
                res.render('error');
            } else {
                res.render('cart', {cartitems: result, quantities: req.session.quantity });
            }
        });
    }
});

// ==================================================
// Route save cart items to SALEORDER and ORDERDETAILS tables
// ==================================================
router.get('/checkout', function(req, res, next) {
    var proditemprice = 0;
    // Check to make sure the user has logged-in
    if (typeof req.session.customer_id !== 'undefined' && req.session.customer_id ) {
        // Save INVOICE Record:
        let insertquery = "INSERT INTO invoice(user_id, invoice_date) VALUES (?, now())";
        db.query(insertquery,[req.session.customer_id],(err, result) => {
            if (err) {
                console.log(err);
                res.render('error');
            } else {
                // Obtain the invoice_id value of the newly created SALEORDER Record
                var invoice_id = result.insertId;
                // Save SALEORDER Records
                // There could be one or more items in the shopping cart
                req.session.cart.forEach((cartitem, index) => {
                    // Perform SALEORDER table insert
                    let insertquery = "INSERT INTO saleorder(invoice_id, product_id, quantity, total) VALUES (?, ?, ?, (SELECT price from product where id = " + cartitem + "))";
                    db.query(insertquery,[invoice_id, cartitem, req.session.quantity[index]],(err, result) => {
                        if (err) {res.render('error');}
                    });
                });
                // Empty out the items from the cart and quantity arrays
                req.session.cart = [];
                req.session.quantity = [];
                // Display confirmation page
                res.render('checkout', {ordernum: invoice_id });
            }
        });
    }
    else {
        // Prompt user to login
        res.redirect('/user/login');
    }
});

module.exports = router;
