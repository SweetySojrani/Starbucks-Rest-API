var exports = module.exports;

var greeter   = require('../models/greeter');
const axios = require('axios');

exports.createOrder = function(req, res) {

	console.log("Placing the order");
	console.log(req.session.cart);

	var context = {
		siteTitle: "My Order"
		,pageDescr: "Order Check Out"
		
	};

	var orderId = req.session.cart.orderId;
	var userId = req.session.id;
	console.log(orderId);
	var amt = req.session.cart.totals;
	var url = "http://18.144.44.79:5000/payment/" + userId + "/" + orderId + "/" + amt;

    axios.post(url, {
		Items: req.session.cart.items
	}).then(function (response) {
	//	console.log(response);
		console.log(response.data);
		req.session.cart.orderId = orderId;
		 res.render(template, context);
		console.log("orderID:" + orderId);
	}).catch(function (error) {
		console.log(error);
	});

	

	  var template = __dirname + '/../views/pay';
	 

    console.log("Order Placed in Payment");
 
};


exports.OrderPayment = function(req, res){

	 var orderId = req.session.cart.orderId;
	 var userId = req.session.id; 
	 console.log("orderID in Payment:" + orderId);

	 var urlpayment = "http://18.144.44.79:5000/payment/" + orderId;

	 var urlorder = "http://localhost:5000/order?id=" + orderId;

	 console.log("Payment url :" + urlpayment);
     console.log("Order url :" + urlorder);


	 axios.post(urlpayment).then(function (response) {
		console.log(response);

		var context = {
		siteTitle: "My Order"
		,pageDescr: "Order Payment"		
	    };
	    res.render(template, context);
	}).catch(function (error) {
		console.log(error);
	});    

		axios.post(urlorder).then(function (response) {
		console.log(response);

		var context = {
		siteTitle: "My Order"
		,pageDescr: "Order Completed"		
	    };
	   res.render(template, context);
	}).catch(function (error) {
		console.log(error);
	}); 

	 var template = __dirname + '/../views/complete';
}


