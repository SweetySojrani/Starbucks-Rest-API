var exports = module.exports;

var greeter   = require('../models/greeter');
const axios = require('axios');

exports.order = function(req, res) {

	var productId = req.body.product_id;
	var productName = req.body.product_name;
	var description = req.body.product_description;
	var image = req.body.product_image;
	var price = req.body.product_price;
	var quantity = req.body.product_count;

	console.log(productName);
	console.log(price);
	console.log(quantity);

	var orderId;
	var userId;
	//var url = "52.52.214.192:3000";
	var url = "http://localhost:3000/user/123/order";

	axios.post(url, {
		Items: [{
			Name: productName,
			Price: price,
			Quantity: quantity
		}]
	}).then(function (response) {
	//	console.log(response);
		console.log(response.data);
		orderId = response.data.OrderId;
		console.log("orderID:" + orderId);
	}).catch(function (error) {
		console.log(error);
	});


	  var context = {
	    siteTitle: "My Order"
	  ,pageDescr: "Order Check Out"
      ,productId: productId
      ,description: description
	  ,product: productName
	  ,price: price
	  ,quantity: quantity
	  ,imageUrl: image
	  };

	  var template = __dirname + '/../views/order';
	  res.render(template, context);
 
};

exports.completeOrder = function(req, res){

	 var orderId = req.query.order_id;
	 var userId;
	 var orderStatus;

	 var url = "http://localhost:3000/user/123/order/" + orderId;

	 axios.post(url).then(function (response) {
		console.log(response);
		//orderId = response.data.OrderId;
	}).catch(function (error) {
		console.log(error);
	});


}






