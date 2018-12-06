var exports = module.exports;

var greeter   = require('../models/greeter');

exports.mycards = function(req, res) {

	  var name = req.query.name || "";

	  var context = {
	    siteTitle: "My Cards"
	  ,pageDescr: "Manage My Cards"
      ,balance: 16.66
	  };

	  var template = __dirname + '/../views/mycards';
	  res.render(template, context);
 
	};

