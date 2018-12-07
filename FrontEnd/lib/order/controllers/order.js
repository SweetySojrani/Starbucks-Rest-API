var exports = module.exports;

var greeter   = require('../models/greeter');
const axios = require('axios');

exports.createOrder = function(req, res) {

	console.log("going to create order");
	console.log(req.session.cart);

	var orderId;
	var userId = req.session.userid;
//	var url = "http://orderAPI-elb-907723796.us-west-1.elb.amazonaws.com:80/user/" + userId + "/order";

	var context = {
		siteTitle: "My Order"
		,pageDescr: "Order Check Out"
		,productsData: req.session.cart.items,
		orderId: orderId,
		total: req.session.cart.totals.toFixed(2)
	};
//	var url = "http://52.52.214.192:3000/user/" + userId + "/order";
	var url = "http://35.188.130.38:80/order/user/" + userId + "/order";

	axios.post(url, {
		Items: req.session.cart.items
	}).then(function (response) {
	//	console.log(response);
		console.log(response.data);
		orderId = response.data.OrderId;
		req.session.cart.orderId = orderId;
		console.log("orderID:" + orderId);
		res.render(template, context);
	}).catch(function (error) {
		console.log(error);
	});

	  var template = __dirname + '/../views/checkout';	  
 
};

exports.getOrderStatus = function(req, res) {
	var orderId = req.query.id;
	var userId = req.session.userid;
	console.log("user ID:");
	console.log(userId);
	var orderData;

//	var url = "http://orderAPI-elb-907723796.us-west-1.elb.amazonaws.com:80/user/" + userId + "/order/" + orderId;
//	var url = "http://52.52.214.192:3000/user/" + userId + "/order/" + orderId;
	var url = "http://35.188.130.38:80/order/user/" + userId + "/order/" + orderId;

	var context = {
	    siteTitle: "My Orders"
	  ,pageDescr: "My Order Detail"
	};

	axios.get(url).then(function (response) {
		console.log("order detial");
	//	console.log(response.data);
		context.orderData = response.data;
		context.items = response.data.Items;
		console.log("items:");
		console.log(context.items);
		res.render(template, context);
	}).catch(function (error) {
		console.log(error);
	});

	var template = __dirname + '/../views/orderDetail';

}

exports.completeOrder = function(req, res){

	 var orderId = req.body.order_id;
	 var userId = req.session.userid;
	 var responseData;

	 console.log("order ID in completeOrder function")
	 console.log(orderId);
	 console.log(userId);

	 var context = {
	    siteTitle: "My Orders"
	  ,pageDescr: "My Orders"
	};
//	 var url = "http://orderAPI-elb-907723796.us-west-1.elb.amazonaws.com:80/user/" + userId + "/order/" + orderId;
//	 var url = "http://52.52.214.192:3000/user/" + userId + "/order/" + orderId;
	 var url = "http://35.188.130.38:80/order/user/" + userId + "/order/" + orderId;

	 axios.post(url).then(function (response) {
		console.log(response.data);
		context.responseData = response.data;
		res.render(template, context);
		//orderId = response.data.OrderId;
	}).catch(function (error) {
		console.log(error);

	});

	req.session.cart = {
		items: [],
		totals: 0.00,
		formattedTotals: ''
	};

	var template = __dirname + '/../views/order';

}

exports.orders = function(req, res) {

	var userId = req.session.userid;
	
//	var url = "http://orderAPI-elb-907723796.us-west-1.elb.amazonaws.com:80/user/" + userId + "/orders";
	//var url = "http://52.52.214.192:3000/user/" + userId + "/orders";
	var url = "http://35.188.130.38:80/order/user/" + userId + "/orders";
	var ordersData;

	var context = {
	    siteTitle: "My Orders"
	  ,pageDescr: "My Orders History"
	};

	axios.get(url).then(function (response){
		//console.log(response);
		console.log(response.data);
		context.ordersData = response.data;
		console.log(context);
		res.render(template, context);
	}).catch(function (error) {
		console.log(error);
	});


	var template = __dirname + '/../views/orders';
//	res.render(template, context);


}

exports.cart = function(req, res) {

	if (!req.session.cart) {
		req.session.cart = {
			items: [],
			totals: 0,
			formattedTotals: ''
		};
	}

  	var context = {
    	siteTitle: "My Order",
    	pageDescr: "Order Check Out",
  		productsData: req.session.cart.items
  };

	  var template = __dirname + '/../views/cart';
	  res.render(template, context);
 
}

exports.addToCart = function(req, res) {

	if (!req.session.cart) {
		req.session.cart = {
			items: [],
			totals: 0,
			formattedTotals: ''
		};
	}

	var product = { 
		_id: req.body.product_id,
		name: req.body.product_name,
		image_url: req.body.product_image,
		description: req.body.product_description,
		price: req.body.product_price,
		quantity: 1,
		size: "Grande"
	};

	req.session.cart.items.push(product);
	req.session.cart.totals += parseFloat(product.price);

	console.log("added new item to cart:");
	console.log(req.session.userid);
	console.log(req.session.name);
	console.log(req.session.cart);

  	var context = {
    	siteTitle: "My Order",
    	pageDescr: "Order Check Out",
  		productsData: req.session.cart.items,
  };

	  var template = __dirname + '/../views/cart';
	  res.render(template, context);
 
}


