var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");

//require models
var burger = require("./models/burger.js");

//connected to heroku or port 3000
var port = process.env.PORT || 3000;

var app = express();

//body parse
app.use(express.static(process.cwd() + "/public"));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(methodOverride("_method"));

// require handlebars
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


var routes = require("./controllers/burgers_controller.js");

app.use("/", routes);


app.get("/api/burger", function(req, res){
  
  res.json(burger);
});

app.post("api/burger", function(req, res){
  console.log(req.body.burger_name);
  var user = req.body;

  burger.push(user);
});

app.listen(port, function() {
  console.log("Listening on PORT " + port);
});