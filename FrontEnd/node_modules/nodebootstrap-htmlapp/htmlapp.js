var express = require('express')
  , log     = require('metalogger')()
  , CONF    = require('config')
  , http    = require('http');

exports = module.exports;

exports.setup = function(initapp) {

  var someapp = initapp || express();

  // var root_dir = require('path').dirname(module.parent.filename);
  var root_dir = require('path').dirname(require.main.filename);

  someapp.set('views', root_dir + '/views');
  //app.set("view options", { layout: appDir + '/views' });

  if (('app' in CONF) && ('csrf' in CONF.app) && CONF.app.csrf === true) {
    someapp.use(require('csurf')());
    log.notice("CSRF protection turned on. ATTENTION: this may create problems if you use NodeBootstrap to build APIs!");
  }

  // This is not needed if you handle static files with, say, Nginx (recommended in production!)
  // Additionally you should probably pre-compile your LESS stylesheets in production
  // Last, but not least: Express' default error handler is very useful in dev, but probably not in prod.
  if (('NODE_SERVE_STATIC' in process.env) && process.env['NODE_SERVE_STATIC'] == 1) {
    var pub_dir = CONF.app.pub_dir;

    if (pub_dir[0] != '/') { pub_dir = '/' + pub_dir; } // humans are forgetful
    pub_dir = root_dir + pub_dir;

    someapp.use(require('less-middleware')(pub_dir ));
    someapp.use(require('serve-static')(pub_dir));
  }

  return someapp;
}
