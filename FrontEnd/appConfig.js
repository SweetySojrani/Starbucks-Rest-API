require('app-module-path').addPath(__dirname + '/lib');

exports.setup = function(runningApp, callback) {
  // Nothing ever comes from "x-powered-by", but a security hole
  runningApp.disable("x-powered-by");

  // Choose your favorite view engine(s)
  runningApp.set('view engine', 'handlebars');
  runningApp.engine('handlebars', require('hbs').__express);

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
