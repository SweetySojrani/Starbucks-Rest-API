var exports = module.exports;

var greeter   = require('../models/greeter');

exports.loginForm = function(req, res) {

  var name = req.query.name || "";

  var context = {
    siteTitle: "Login Form"
  , welcomeMessage: greeter.welcomeMessage(name)
  ,pageDescr: "Let's login to go further"
  };

  var template = __dirname + '/../views/loginForm';
  res.render(template, context);

  // Just responding with a string, without any template:
  // res.status(200).send('Hello World');
};

exports.loginSubmit = function(req, res) {

	  var name = req.query.name || "";

	  var context = {
	    siteTitle: "Home"
	  , welcomeMessage: greeter.welcomeMessage(name)
	  ,pageDescr: "Welcome to our Starbucks Club"
	  };

	  //var template = __dirname + '/../views/login';
	  //res.render(template, context);
	  res.redirect('/mycards');
	  
	  // Just responding with a string, without any template:
	  // res.status(200).send('Hello World');
	};

