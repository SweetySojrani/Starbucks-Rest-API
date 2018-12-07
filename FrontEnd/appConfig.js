require('app-module-path').addPath(__dirname + '/lib');

exports.setup = function(runningApp, callback) {
  // Nothing ever comes from "x-powered-by", but a security hole
  runningApp.disable("x-powered-by");

  var session= require('express-session');
  var sa=session({
  	  cookieName: 'session',
  	  secret: 'eb[isfd-8yF9-7w2315df{}+Ijsli;;to8',
  	  duration: 30 * 60 * 1000,
  	  activeDuration: 5 * 60 * 1000,
  	  httpOnly: true,
  	  secure: true,
  	  ephemeral: true,
  	  resave: true,
  	  saveUninitialized: true,
  	  kongServer: '35.188.130.38',
  	  kongPort: '80'
  });
  runningApp.use(sa);
  
  // Choose your favorite view engine(s)
  runningApp.set('view engine', 'handlebars');
  

  var handlbars = require('hbs');
  
  
  
  handlbars.registerHelper("sessionN", function(x){
	  if(x==0) {
	  //console.log(runningApp.get('sname'));
	  return runningApp.get('sname');
	  } else if (x==1) {
		  var sname=runningApp.get('sname');
		  if (typeof sname !== 'undefined' && sname !== null && sname!=='') {
			  //console.log("true");
			  return true;
		  }
		  else {
			  //console.log("false");
			  return false;
		  }		  
	  }
	  
  	});
  

  
  
  runningApp.engine('handlebars', handlbars.__express);//  require('hbs').__express);


  
  //// you could use two view engines in parallel (if you are brave):
  // runningApp.set('view engine', 'j2');
  // runningApp.engine('j2', require('swig').renderFile);


  //---- Mounting well-encapsulated application modules (so-called: "mini-apps")
  //---- See: http://expressjs.com/guide/routing.html and http://vimeo.com/56166857
  runningApp.use('/hello', require('hello')); // attach to sub-route
  runningApp.use('/', require('hello')); // attach to root route

  
  runningApp.use('/login', require('login'));  
  runningApp.use('/mycards', require('mycards')); 
  
  runningApp.use('/addcard', require('addcard'));
  runningApp.use('/order', require('order'));
  runningApp.use('/pay', require('pay'));
  runningApp.use('/products', require('products'));
  
  
  
  // API endpoint attached to root route:
  runningApp.use('/api', require('homedoc')); // attach to sub-route

  // If you need websockets:
  // var socketio = require('socket.io')(runningApp.http);
  // require('fauxchatapp')(socketio);

  if(typeof callback === 'function') {
    callback(runningApp);
  }
};
