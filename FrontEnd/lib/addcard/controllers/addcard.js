var exports = module.exports;

var greeter   = require('../models/greeter');

exports.addcard = function(req, res) {

	  var name = req.query.name || "";

	  var context = {
	    siteTitle: "Add Card"
	  ,pageDescr: "Add Card to get more balance"
      ,balance: 16.66
	  };

	  var template = __dirname + '/../views/addcard';
	  res.render(template, context);
 
	};
	exports.addcardPost = function(req, res) {

		  var name = req.query.name || "";

		  var context = {
		    siteTitle: "Add Card"
		  ,pageDescr: "Add Card to get more balance"
	      ,balance: 16.66
		  };

		  res.redirect('/mycards');
	 
		};
	