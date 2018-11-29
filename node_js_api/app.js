const express = require("express");
const app = express();
const expressHandlebars = require("express-handlebars");
const port = 3000;

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

app.get("/products", (req, res) => {
  res.render("products");
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
