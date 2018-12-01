var exports = module.exports;

var greeter   = require('../models/greeter');

exports.products = function(req, res) {

	  var name = req.query.name || "";

	  var context = {
	    siteTitle: "products"
	  ,pageDescr: "Our Wonderful Product List"
	  };

	  var template = __dirname + '/../views/products';
	  res.render(template, context);
 
	};

