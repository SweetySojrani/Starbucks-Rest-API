var exports = module.exports;

var greeter   = require('../models/greeter');

exports.products = function(req, res) {

	  var name = req.query.name || "";

	  var productsData;
	  
//	  axios.get("http://localhost:3000/products").then(function(productsData) {
//		    productsData = productsData.data;
//	  }    
		    
	  var context = {
	    siteTitle: "products"
	   ,pageDescr: "Our Wonderful Product List"
	   ,productsData: productsData
	   ,  items: [
		    {name: "Handlebars", emotion: "love"},
		    {name: "Mustache", emotion: "enjoy"},
		    {name: "Ember", emotion: "want to learn"}
		  ]
	   
	  };

	  
	  
	  
	  var template = __dirname + '/../views/products';
	  res.render(template, context);
 
	};

