var exports = module.exports;

var greeter   = require('../models/greeter');

exports.order = function(req, res) {

	  var name = req.query.name || "";
	  var prices=[3.99,4.99,5.99,7.99];
	  var Descrs=["Espresso shots are topped with hot water to produce a light layer of crema. The result is this wonderfully rich cup with depth and nuance. Pro tip: for additional caffeine, ask your barista to try this with an extra shot (75 mg caffeine per shot)."
		  ,"A Christmas classic since 1984 Festive, full-bodied and spicy with the addition of rare aged Sumatran coffee, our favorite tradition is finally here. Grab a bag of Starbucks® Christmas Blend Vintage 2018 before we’re all out!"
		  ,"Subtle with delicate nuances of soft cocoa and lightly toasted nuts, plus 2X the caffeine*."
		  ,"Mellow & Soft Subtle with delicate nuances of soft cocoa and lightly toasted nuts."
	  ];
	  var products=["Caffe Americano","White Hot Chocolate","Cinnamon Dolce Latte","Starbucks Reserve Latte"]

	  var context = {
	    siteTitle: "My Order"
	  ,pageDescr: "Order Check Out"
      ,productId: req.query.id
      ,description: Descrs[req.query.id-1]
	  ,product: products[req.query.id-1]
	  ,price: prices[req.query.id-1]
	  };

	  var template = __dirname + '/../views/order';
	  res.render(template, context);
 
	};

