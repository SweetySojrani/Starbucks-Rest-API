const express = require("express");
const app = express();
const expressHandlebars = require("express-handlebars");
var Client = require("node-rest-client").Client;
const port = 4000;

const hbs = expressHandlebars.create({
  mainLayout: "main"
});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

//middleware
app.use(express.static("views/images"));

app.get("/", (req, res) => {
  res.render("home");
});

//Get the products API and display it
app.get("/products", (req, res) => {
  var result = new Object();
  var client = new Client();
  var productsData = [
    { name: "Coffee", count: 10 },
    { name: "Tea", count: 900 }
  ];
  client.get("http://localhost:3000/products", (data, response_raw) => {
    productsData = data[0];
    console.log(productsData.name);
    // for (var key in data) {
    //   console.log("key: ", key, " val: ", data[key]);
    // }
  });
  res.render("product", { productsData: productsData });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
