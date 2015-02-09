var express = require('express');
var router = express.Router();

/* GET store listing. */

projection = function(req,res){
  pagination(req, res, req.query.fields, 'store');
};

router.get('/', function(req, res){
	if(req.query.fields)
		return projection(req, res);
	else
		return pagination(req, res, '*', 'store');
});
//e.g http://localhost:3000/stores?offset=0&limit=10

module.exports = router;
