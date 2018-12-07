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
    pageDescr: "Our Wonderful Product List"
    // productsData: [
    //   { name: "Coffee1", image: "menu1.png" },
    //   { name: "Coffee2", image: "menu2.png" },
    //   { name: "Coffee3", image: "menu3.png" }
    // ]
  };

  axios.get("http://54.219.171.16:3000/products").then(function(productsData) {
    context.productsData = productsData.data;
    console.log(productsData.data);
    res.render(template, context);
  });

  var template = __dirname + "/../views/products";
  // res.render(template, context);
};

exports.product = function(req, res) {
  var productID = req.query.id;

  var productsData;

  //	  axios.get("http://localhost:3000/products").then(function(productsData) {
  //		    productsData = productsData.data;
  //	  }

  var context = {
    siteTitle: "products",
    pageDescr: "Our Wonderful Product List"
  };
  let productId = req.query.id;
  axios
    .get(`http://54.219.171.16:3000/products/${productId}`)
    .then(function(productData) {
      context.productData = productData.data;
      console.log(productData.data);
      res.render(template, context);
    })
    .catch(err => {
      console.log(err);
    });

  var template = __dirname + "/../views/product";
};
