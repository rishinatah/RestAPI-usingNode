var express = require('express');
var router = express.Router();

/* GET rental listing. */
var pagination = function(req,res){
	sql.query({
	    sql: 'SELECT * FROM rental',
	    nestTables: true,
	    paginate: {
	        page: 1+ req.query.offset/req.query.limit,
	        resultsPerPage: req.query.limit 
	    }
	}).then(function(query_res) {
	// res.send(query_res);
	var links = [
			{rel:"next", href:req.params.name}
	]
	var pagination_res = {data:query_res, links:links};
	res.send(pagination_res);
	});
};



router.get('/', pagination);
//e.g http://localhost:3000/rentals?offset=0&limit=10

module.exports = router;
