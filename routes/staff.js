var express = require('express');
var router = express.Router();

/* GET staff listing. */
var pagination = function(req,res,fields){
	sql.query(
		'SELECT staff_id FROM staff ORDER BY staff_id DESC LIMIT 1'
	).then(function(query_res) {
		last_num = query_res[0].staff_id;
	});

	if (!req.query.offset){
		req.query.offset = 0;
	}
	if(!req.query.limit){
		req.query.limit = 3;
	}

	sql.query(
	    'SELECT ' + fields + ' FROM staff LIMIT ' + req.query.limit +
	    ' OFFSET ' + req.query.offset
	).then(function(query_res) {

	var next_num = parseInt(req.query.offset)+parseInt(req.query.limit);
	var prev_num = parseInt(req.query.offset)-parseInt(req.query.limit);
	var lastpage_num = parseInt(last_num)-parseInt(req.query.limit);

	if(next_num>last_num) {
		var next_link = {rel:"next", href:''}
	} else {
		var next_link = {rel:"next", href:req.protocol + '//:' + req.hostname +
			':' + req.app.locals.settings.port+req.baseUrl 
			+ '?offset=' + next_num
			+ '&limit=' + req.query.limit}
	}

	if(prev_num<0) {
		var prev_link = {rel:"prev", href:''}
	} else {
		var prev_link = {rel:"prev", href:req.protocol + '//:' + req.hostname +
			':' + req.app.locals.settings.port+req.baseUrl 
			+ '?offset=' + prev_num
			+ '&limit=' + req.query.limit}
	}

	var links = [
			next_link,

			{rel:"self", href:req.protocol+'//:'+req.hostname+
			':'+req.app.locals.settings.port+req.originalUrl},

			prev_link,

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
		res.send('out of bound');
	}else{
		res.send(pagination_res);
	}

	});
};

var projection = function(req,res){
	pagination(req, res, req.query.fields);
};


router.get('/', function(req, res){
	if(req.query.fields)
		return projection(req, res);
	else
		return pagination(req, res, '*');
});
//e.g http://localhost:3000/staffs?offset=0&limit=10

module.exports = router;
