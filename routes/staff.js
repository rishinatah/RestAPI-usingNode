var express = require('express');
var router = express.Router();

/* GET staff listing. */

projection = function(req,res){
  pagination(req, res, req.query.fields, 'staff');
};

router.get('/', function(req, res){
	if(req.query.fields)
		return projection(req, res);
	else
		return pagination(req, res, '*', 'staff');
});
//e.g http://localhost:3000/staff?offset=0&limit=10

module.exports = router;
