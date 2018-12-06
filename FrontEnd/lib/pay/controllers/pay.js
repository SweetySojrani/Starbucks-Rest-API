var exports = module.exports;

var greeter   = require('../models/greeter');
const axios = require('axios');

exports.createOrder = function(req, res) {

	console.log("Placing the order");
	console.log(req.session.cart);

	var orderId = req.session.orderId;
	var userId = req.session.id;
	var amt = req.session.cart.totals
	var url = "http://localhost:4000/payment/" + userId + "/" + orderId + "/" + amt;

    axios.post(url, {
		Items: req.session.cart.items
	}).then(function (response) {
	//	console.log(response);
		console.log(response.data);
		orderId = response.data.orderid;
		req.session.cart.orderId = orderId;
		console.log("orderID:" + orderId);
	}).catch(function (error) {
		console.log(error);
	});

    console.log("Order Placed in Payment");
 
};


exports.OrderPayment = function(req, res){

	 var orderId = req.query.order_id;
	 var userId = req.session.id;
	 
	 var template = __dirname + '/../views/PaymentInfo';

	 var url = "http://localhost:4000/payment/" + orderId;

	 axios.post(url).then(function (response) {
		console.log(response);
		//orderId = response.data.OrderId;
	}).catch(function (error) {
		console.log(error);
	});    

}



