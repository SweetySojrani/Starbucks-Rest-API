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
		    {name: "Coffee1", image: "menu1.png"},
		    {name: "Coffee2", image: "menu2.png"},
		    {name: "Coffee3", image: "menu3.png"}
		  ]
	   
	  };

	  var template = __dirname + '/../views/products';
	  res.render(template, context);
 
	};

