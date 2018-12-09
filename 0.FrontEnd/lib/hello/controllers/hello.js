var exports = module.exports;

var greeter   = require('../models/greeter');

exports.sayHello = function(req, res) {

  var name = req.query.name || "";

  var context = {
    siteTitle: "Home"
  , welcomeMessage: greeter.welcomeMessage(name)
  ,pageDescr: "Welcome to our Starbucks Club"
  };

  var template = __dirname + '/../views/hello';
  res.render(template, context);

  // Just responding with a string, without any template:
  // res.status(200).send('Hello World');
};