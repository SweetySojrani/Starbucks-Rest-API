/**
* This is a "mini-app" that encapsulates router definitions. See more
* at: http://expressjs.com/guide/routing.html (search for "express.Router")
*
*/

var router = require('express').Router({ mergeParams: true });
module.exports = router;

// Don't just use, but also export in case another module needs to use these as well.
router.callbacks    = require('./controllers/order');
router.models       = require('./models');

//-- For increased module encapsulation, you could also serve templates with module-local
//-- paths, but using shared layouts and partials may become tricky / impossible
//var hbs = require('hbs');
//app.set('views', __dirname + '/views');
//app.set('view engine', 'handlebars');
//app.engine('handlebars', hbs.__express);

// Module's Routes. Please note this is actually under /hello, because module is attached under /hello

router.get('/', router.callbacks.createOrder);
router.post('/', router.callbacks.createOrder);
router.post('/id/', router.callbacks.completeOrder);
router.get('/id/', router.callbacks.getOrderStatus);
router.get('/history', router.callbacks.orders);




