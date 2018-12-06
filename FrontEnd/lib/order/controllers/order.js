var exports = module.exports;

var greeter   = require('../models/greeter');
const axios = require('axios');

exports.createOrder = function(req, res) {

	console.log("going to create order");
	console.log(req.session.cart);

	var orderId;
	var userId;
	//var url = "52.52.214.192:3000";
	var url = "http://localhost:3000/user/234/order";

	axios.post(url, {
		Items: req.session.cart.items
	}).then(function (response) {
	//	console.log(response);
		console.log(response.data);
		orderId = response.data.OrderId;
		req.session.cart.orderId = orderId;
		console.log("orderID:" + orderId);
	}).catch(function (error) {
		console.log(error);
	});


	var context = {
		siteTitle: "My Order"
		,pageDescr: "Order Check Out"
		,productsData: req.session.cart.items,
		orderId: orderId,
		total: req.session.cart.totals.toFixed(2)
	};

	  var template = __dirname + '/../views/checkout';
	  res.render(template, context);
 
};

exports.getOrderStatus = function(req, res) {
	var orderId = req.query.id;
	var userId;
	var orderData;

	var url = "http://localhost:3000/user/234/order/" + orderId;

	var context = {
	    siteTitle: "My Orders"
	  ,pageDescr: "My Order Detail"
	};

	axios.get(url).then(function (response) {
		console.log(response.data);
		context.orderData = response.data;
		res.render(template, context);
	}).catch(function (error) {
		console.log(error);
	});

	var template = __dirname + '/../views/orderDetail';

}

exports.completeOrder = function(req, res){

	 var orderId = req.query.order_id;
	 var userId;
	 var orderStatus;

	 var url = "http://localhost:3000/user/234/order/" + orderId;

	 axios.post(url).then(function (response) {
		console.log(response);
		//orderId = response.data.OrderId;
	}).catch(function (error) {
		console.log(error);
	});

	req.session.cart = {
		items: [],
		totals: 0.00,
		formattedTotals: ''
	};


}

exports.orders = function(req, res) {

	var userId;
	var url = "http://localhost:3000/user/234/orders";
	let ordersData = [];

	var context = {
	    siteTitle: "My Orders"
	  ,pageDescr: "My Orders History"
	};
/*
	context.ordersData = [{Items: {name: "coffee1", price: 4.0},
    OrderId: '3af3b098-058a-4fd8-9f5d-3365c77a5b4d',
    OrderStatus: 'Order Created',
    UserId: '123',
    _id: '5c060f5cdb15e00105af68cc'}, {
    Items: {name: "coffee2", price: 3.0},
    OrderId: '0cd71df4-f6d6-4596-94c9-89174a77f99e',
    OrderStatus: 'Order Created',
    UserId: '123',
    _id: '5c06101adb15e00105af68d3'
    }, {
    Items: {name: "coffee3", price: 3.0},
    OrderId: '8d1b6ba7-9220-40b5-89c3-f6680870dbca',
    OrderStatus: 'Order Created',
    UserId: '123',
    _id: '5c06101adb15e00105af68d3'
    }];*/

	axios.get(url).then(function (response){
		//console.log(response);
		console.log(response.data);
		context.ordersData = response.data;
		console.log(context);
		res.render(template, context);
	}).catch(function (error) {
		console.log(error);
	});

//	document.getElementById("target-id").innerHTML = context.ordersData;

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
		price: req.body.product_price
	};

	req.session.cart.items.push(product);
	req.session.cart.totals += parseFloat(product.price);

	console.log("added new item to cart:");
	console.log(req.session.id);
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


