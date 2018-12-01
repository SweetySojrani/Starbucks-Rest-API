// @see: https://gist.github.com/branneman/8048520
require('app-module-path').addPath(__dirname + '/lib');

var express = require('express');

var server = require('nodebootstrap-server')
  , appConfig = require('./appConfig')
  , app    = express();

app.use(express.static(__dirname + '/public'));   //hnote: add public folder, not sure why node_modules\nodebootstrap-htmlapp not set it


var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app = require('nodebootstrap-htmlapp').setup(app);

server.setup(app, appConfig.setup);
