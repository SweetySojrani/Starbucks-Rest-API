const express = require("express");
const app = express();
const expressHandlebars = require("express-handlebars");
const axios = require("axios");
const port = 4000;
var bodyParser = require("body-parser");

const hbs = expressHandlebars.create({
  mainLayout: "main"
});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

//middleware
app.use(express.static("views/images"));
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.render("home");
});

//Get each Product
app.get("/products/:id", (req, res) => {
  let productId = req.params.id;
  axios
    .get(`http://localhost:3000/products/${productId}`)
    .then(function(productData) {
      productData = productData.data;
      console.log(productData);
      res.render("eachProduct", { productData: productData });
    })
    .catch(err => {
      console.log(err);
    });
});

//Get the products API and display it
app.get("/products", (req, res) => {
  axios.get("http://localhost:3000/products").then(function(productsData) {
    productsData = productsData.data;
    console.log(productsData.data);
    res.render("product", { productsData: productsData });
  });
});

app.post("/orders", (req, res) => {
  console.log(req.body.product_name);
  console.log(req.body.product_description);
  console.log(req.body.product_image);
  console.log(req.body.product_price);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
