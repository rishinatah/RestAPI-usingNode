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

router.get('/store/manager/:id', function(req, res) {
	sql.query('SELECT * FROM store WHERE manager_staff_id=' + req.params.id)
	.then(function(query_res) {
	res.send(query_res);
	});
});

router.get('/actor&offset=12&limit=0', function(req, res) {
	sql.query({
	    sql: 'SELECT * FROM actor',
	    nestTables: true,
	    paginate: {
	        page: 3,
	        resultsPerPage: 15
	    }
	}).then(function(query_res) {
		res.send(query_res);
	});
});

module.exports = router;
