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
	const querystring = require('querystring'); 
	
	var name = req.query.name || "";

	  var context = {
	    siteTitle: "Home"
	  , welcomeMessage: greeter.welcomeMessage(name)
	  ,pageDescr: "Welcome to our Starbucks Club"
	  };
	  
	  

	  var postData = querystring.stringify({
	      'name' : 'oliver',
	      'password' : '123'
	  });

	  var options = {
	    hostname: '52.8.1.184',
	    port: 3000,
	    path: '/login',
	    method: 'POST',
	    headers: {
	         'Content-Type': 'application/x-www-form-urlencoded',
	         'Content-Length': postData.length
	       }
	  };

	  var req = http.request(options, (res) => {
	    console.log('statusCode:', res.statusCode);
	    console.log('headers:', res.headers);
	    let data = '';
		  // A chunk of data has been recieved.
		  res.on('data', (chunk) => {
		    data += chunk;
		  });
		  // The whole response has been received. Print out the result.
		  res.on('end', () => {
		    console.log(data);
		  });

//	    res.on('data', (d) => {
//	      process.stdout.write(d);
//	    });
	  });

	  req.on('error', (e) => {
	    console.error(e);
	  }); 
	  
	  req.write(postData);
	  req.end();	  
	  
	  

	  //var template = __dirname + '/../views/login';
	  //res.render(template, context);
	  res.redirect('/mycards');
	  
	  // Just responding with a string, without any template:
	  // res.status(200).send('Hello World');
	};

	exports.loginSubmit1 = function(req, res) {

		const http = require('http');
	 
		var name = req.query.name || "";

		  var context = {
		    siteTitle: "Home"
		  , welcomeMessage: greeter.welcomeMessage(name)
		  ,pageDescr: "Welcome to our Starbucks Club"
		  };
		  
		  
			http.get('http://localhost:3001/ping', (resp) => {
				  let data = '';

				  // A chunk of data has been recieved.
				  resp.on('data', (chunk) => {
				    data += chunk;
				  });
				  // The whole response has been received. Print out the result.
				  resp.on('end', () => {
				    console.log(data);
				  });

				}).on("error", (err) => {
				  console.log("Error: " + err.message);
				});

		  //var template = __dirname + '/../views/login';
		  //res.render(template, context);
		  res.redirect('/mycards');
		  
		  // Just responding with a string, without any template:
		  // res.status(200).send('Hello World');
		};

