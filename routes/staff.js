var express = require('express');
var router = express.Router();

/* GET users listing. */

router.get('/', function(req, res, next) {
	sql.query('SELECT * FROM store WHERE store_id=' + req.query.id +
	' AND address_id=' + req.query.addr)
	.then(function(query_res) {
	res.send(query_res);
	});
});

module.exports = router;
