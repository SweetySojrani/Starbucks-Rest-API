var exports = module.exports;

var greeter   = require('../models/greeter');


exports.loginForm = function(req, res) {

  var name = req.query.name || "";
  var error=req.query.error;
  
  var context = {
	siteTitle: "Login Form"
	  , welcomeMessage: greeter.welcomeMessage(name)
	  ,pageDescr: "Let's login to go further"
	  ,error: error
  };
 
  var template = __dirname + '/../views/loginForm';
  res.render(template, context);

};

exports.loginSubmit = function(req, res) {

	const http = require('http');
	const querystring = require('querystring'); 

	//req - the nodejs request from UI
	var name=req.body.username;
	var password=req.body.password; 
	  
	var postData = querystring.stringify({
	      'name' : name,
	      'password' : password
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
	  
	  //data - the go api return data
	  var data='';
	  //req2 - the outgoing request to go api 
	  var req2 = http.request(options, (res2) => {
	    console.log('statusCode:', res2.statusCode);
	    console.log('headers:', res2.headers);

		  // A chunk of data has been recieved.
		  res2.on('data', (chunk) => {
		    data += chunk;
		  });
		  // The whole response has been received. Print out the result.
		  res2.on('end', () => {
			 console.log(data);
		     console.log(data.length);
		     //console.log(name);
		     //console.log(password);
		    
			 if (data.length>3) { 
				//login success
				 res.redirect('/mycards')
			  } else {
				 res.redirect('/login?error=Invalid User Name and Password');
			  }
		    
		  });

	  });

	  req2.on('error', (e) => {
	    console.error(e);
	  }); 
	  
	  req2.write(postData);
	  //req2.end();	  
	  
	};



