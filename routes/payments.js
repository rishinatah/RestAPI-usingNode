var express = require('express');
var router = express.Router();

/* GET payment listing. */

projection = function(req,res){
  pagination(req, res, req.query.fields, 'payment');
};

router.get('/', function(req, res){
	if(req.query.fields)
		return projection(req, res);
	else
		return pagination(req, res, '*', 'payment');
});
//e.g http://localhost:3000/payments?offset=0&limit=10

module.exports = router;
