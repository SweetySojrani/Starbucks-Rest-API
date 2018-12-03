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

  // Just responding with a string, without any template:
  // res.status(200).send('Hello World');
};

exports.loginSubmit = function(req, res) {

	const http = require('http');
	const querystring = require('querystring'); 
	
	//var name = req.query.username || "";
	 
	
	
	  var context = {
	    siteTitle: "Home"
	  , welcomeMessage: greeter.welcomeMessage(name)
	  ,pageDescr: "Welcome to our Starbucks Club"
	  };
	  
	  
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
	  
 
	  
	  var data='';
	  var req2 = http.request(options, (res2) => {
	    console.log('statusCode:', res2.statusCode);
	    console.log('headers:', res2.headers);
	    //let data = '';
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
				  
				  res.redirect('/mycards')
			  } else {
				  
				  res.redirect('/login?error=Invalid User Name and Password');
			  }
		    
		  });

//		  process.on('uncaughtException', function (err) {
//			    console.log(err);
//			});
		  
//	    res.on('data', (d) => {
//	      process.stdout.write(d);
//	    });
	  });

	  req2.on('error', (e) => {
	    console.error(e);
	  }); 
	  
	  req2.write(postData);
	  //req2.end();	  
	  


	  //var template = __dirname + '/../views/login';
	  //res.render(template, context);
	  
	  
	  // Just responding with a string, without any template:
	  // res.status(200).send('Hello World');
	};



