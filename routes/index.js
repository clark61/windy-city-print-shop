var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
let query = "SELECT id, product_name, product_type, dimensions, price, quantity FROM product";
  // execute query
  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.render('error');
  }

  let query = "SELECT id, title, image, description FROM promotion WHERE start_date <= CURRENT_DATE() and end_date >= CURRENT_DATE()";
  // execute query
  db.query(query, (err, result2) => {
    if (err) {
      console.log(err);
      res.render('error');
    }
    res.render('index', {allrecs: result, promos: result2 });
    });
  });
});

module.exports = router;
