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

	const http = require('http');
 
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


	http.get('http://localhost:3001/goapi?api_key=DEMO_KEY', (resp) => {
	  let data = '';

	  // A chunk of data has been recieved.
	  resp.on('data', (chunk) => {
	    data += chunk;
	  });

	  // The whole response has been received. Print out the result.
	  resp.on('end', () => {
	    console.log(JSON.parse(data).explanation);
	  });

	}).on("error", (err) => {
	  console.log("Error: " + err.message);
	});