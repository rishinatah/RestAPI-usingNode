var express = require('express');
var router = express.Router();

/* GET store listing. */

router.get('/', function(req, res, next) {
	sql.query('SELECT * FROM store WHERE store_id=' + req.query.id +
	' AND address_id=' + req.query.addr)
	.then(function(query_res) {
	res.send(query_res);
	});
});

//e.g http://localhost:3000/stores?offset=0&limit=10

module.exports = router;
