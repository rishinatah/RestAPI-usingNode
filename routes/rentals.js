var express = require('express');
var router = express.Router();

/* GET rental listing. */

projection = function(req,res){
  pagination(req, res, req.query.fields, 'rental');
};

router.get('/', function(req, res){
	if(req.query.fields)
		return projection(req, res);
	else
		return pagination(req, res, '*', 'rental');
});
//e.g http://localhost:3000/rentals?offset=0&limit=10

module.exports = router;
