var exports = module.exports;

var greeter = require("../models/greeter");
var axios = require("axios");

exports.products = function(req, res) {
  var name = req.query.name || "";

  var productsData;

  //	  axios.get("http://localhost:3000/products").then(function(productsData) {
  //		    productsData = productsData.data;
  //	  }

  var context = {
    siteTitle: "products",
    pageDescr: "Our Wonderful Product List",
    productsData: [
      { _id: 0, name: "Coffee1", image_url: "menu1.png", description: "Good coffee",  price: 3.0, count: 3},
      { _id: 1, name: "Coffee2", image_url: "menu2.png", description: "Good coffee",  price: 4.0, count: 4 },
      { _id: 2, name: "Coffee3", image_url: "menu3.png", description: "Good coffee",  price: 5.0, count: 5 }
    ]
  };
/*
  axios.get("http://localhost:3000/products").then(function(productsData) {
    context.productsData = productsData.data;
    console.log(productsData.data);
    res.render(template, context);
  });*/

  
  var template = __dirname + "/../views/products";
   res.render(template, context);
};

exports.product = function(req, res) {
  var productID = req.query.id;

  var productsData = [
      { _id: 0, name: "Coffee1", image_url: "menu1.png", description: "Good coffee",  price: 3.0, count: 3},
      { _id: 1, name: "Coffee2", image_url: "menu2.png", description: "Good coffee",  price: 4.0, count: 4 },
      { _id: 2, name: "Coffee3", image_url: "menu3.png", description: "Good coffee",  price: 5.0, count: 5 }
    ];

  //	  axios.get("http://localhost:3000/products").then(function(productsData) {
  //		    productsData = productsData.data;
  //	  }

  var context = {
    siteTitle: "products",
    pageDescr: "Our Wonderful Product List",
    productData: productsData[productID]
  };

  let productId = req.query.id;
/*  axios
    .get(`http://localhost:3000/products/${productId}`)
    .then(function(productData) {
      context.productData = productData.data;
      console.log(productData.data);
      res.render(template, context);
    })
    .catch(err => {
      console.log(err);
    });*/


  var template = __dirname + "/../views/product";
  res.render(template, context);
};
