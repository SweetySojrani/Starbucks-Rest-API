var exports = module.exports;

var greeter   = require('../models/greeter');

var apihostname = 'nodejs-627042659.us-west-1.elb.amazonaws.com';
var apiport = '80';

exports.logoff = function(req, res) {
	
	 var sessData = req.session;
	  sessData.userid='';
	  sessData.name = '';
	  req.app.set('sname', '');
      res.redirect('/');

	};

exports.loginForm = function(req, res) {

  var name = req.query.name || "";
  var error=req.query.error;
 
  var sname=req.session.name;
  if (typeof sname !== 'undefined' && sname !== null && sname!=='') {
	  var context = {
				siteTitle: "Profile"
				  , welcomeMessage: greeter.welcomeMessage(name)
				  ,pageDescr: "Welcome,"+req.session.name+"!"
			  };
			 
			  var template = __dirname + '/../views/profile';
			  res.render(template, context);	  
  }
  else {

	  var context = {
		siteTitle: "Login Form"
		  , welcomeMessage: greeter.welcomeMessage(name)
		  ,pageDescr: "Let's login to go further"
		  ,error: error
	  };
	 
	  var template = __dirname + '/../views/loginForm';
	  res.render(template, context);
  }
  
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
	    hostname: apihostname,
	    port: apiport,
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
		    
		     var jdata=JSON.parse(data);
		     if(jdata.hasOwnProperty('error')){
		    	 res.redirect('/login?error='+jdata.error);
		     }
             else {
            	 var sessData = req.session;
            	  sessData.userid=jdata._id
            	  sessData.name = jdata.name;
            	  req.app.set('sname', sessData.name);  //hnote: store for hbs
            	  //console.log(sessData.name);
            	 res.redirect('/order/history');
			  }
		    
		  });

	  });

	  req2.on('error', (e) => {
	    console.error(e);
	  }); 
	  
	  req2.write(postData);
	  //req2.end();	  
	  
	};

	
	exports.signupSubmit = function(req, res) {

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
		    hostname: apihostname,
		    port: apiport,
		    path: '/signup',
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
				 //console.log(data);
			     //console.log(data.length);
			     //console.log(name);
			     //console.log(password);
			    
			     var jdata=JSON.parse(data);
			     if(jdata.hasOwnProperty('error')){
			    	 res.redirect('/login?error='+jdata.error);
			     } else {
			    	 res.redirect('/login?error=Success!Please login with your new user id'); 
			     }
			    
			  });

		  });

		  req2.on('error', (e) => {
		    console.error(e);
		  }); 
		  
		  req2.write(postData);
		  //req2.end();	  
		  
		};	
	

