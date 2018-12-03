var exports = module.exports;

var greeter   = require('../models/greeter');
const axios = require('axios');

exports.order = function(req, res) {

	var productId = req.query.product_id;
	var productName = req.query.product_name;
	var description = req.query.product_description;
	var image = req.query.product_image;
	var price = req.query.product_price;
	var quantity = req.query.product_count;

	var orderId;
	var userId;
	//var url = "52.52.214.192:3000";
	var url = "localhost:3000/user/123/order";

	axios.post(url, {
		Items: {
			Name: productName,
			Price: price,
			Quantity: quantity
		}
	}).then(function (response) {
		console.log(response);
		orderId = response.data.OrderId;
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

	 var url = "localhost:3000/user/123/order/" + orderId;

	 axios.post(url).then(function (response) {
		console.log(response);
		//orderId = response.data.OrderId;
	}).catch(function (error) {
		console.log(error);
	});


}






