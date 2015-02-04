var express = require('express');
var router = express.Router();

/* GET rental listing. */
var pagination = function(req,res){

	sql.query(
		'SELECT rental_id FROM rental ORDER BY rental_id DESC LIMIT 1'
	).then(function(query_res) {
		last_num = query_res;
		res.send(last_num);
	});

	if (!req.query.offset){
		req.query.offset = 0;
	}
	if(!req.query.limit){
		req.query.limit = 3;
	}

	sql.query(
	    'SELECT * FROM rental LIMIT ' + req.query.limit +
	    ' OFFSET ' + req.query.offset
	).then(function(query_res) {

	var next_num = parseInt(req.query.offset)+parseInt(req.query.limit);
	var prev_num = parseInt(req.query.offset)-parseInt(req.query.limit);
	var lastpage_num = parseInt(last_num)-parseInt(req.query.limit);

	var links = [
			{rel:"next", href:req.protocol + '//:' + req.hostname +
			':' + req.app.locals.settings.port+req.baseUrl 
			+ '?offset=' + next_num
			+ '&limit=' + req.query.limit},

			{rel:"self", href:req.protocol+'//:'+req.hostname+
			':'+req.app.locals.settings.port+req.originalUrl},

			{rel:"prev", href:req.protocol + '//:' + req.hostname +
			':' + req.app.locals.settings.port+req.baseUrl 
			+ '?offset=' + prev_num
			+ '&limit=' + req.query.limit},

			{rel:"last", href:req.protocol + '//:' + req.hostname +
			':' + req.app.locals.settings.port+req.baseUrl 
			+ '?offset=' + lastpage_num
			+ '&limit=' + req.query.limit},

			{rel:"first", href:req.protocol + '//:' + req.hostname +
			':' + req.app.locals.settings.port+req.baseUrl 
			+ '?offset=' + 0
			+ '&limit=' + req.query.limit}
	]

	var pagination_res = {data:query_res, links:links};

	if(req.query.offset>last_num){
		res.send('OUT OF BOUND');
	}else{
		res.send(pagination_res);
	}

	});
};

var projection = function(req,res){};

router.get('/', function(req, res){
	if(req.query.fields)
		return projection(req, res);
	else
		return pagination(req, res);
});
//e.g http://localhost:3000/rentals?offset=0&limit=10

module.exports = router;
