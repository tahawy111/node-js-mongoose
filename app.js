const express = require("express");
const app = express();
const mongoose = require("mongoose");
const url = "mongodb://localhost:27017/firstDB";
const bodyParser = require("body-parser");
const path = require("path");
const userSchema = mongoose.Schema({
  name: String,
  age: Number,
});

let User = mongoose.model("user", userSchema);

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static(path.join(__dirname, "statics")));

app.get("/", (req, res, next) => {
  mongoose.connect(url, (err) => {
    User.find((err, users) => {
      mongoose.disconnect();
      res.render("index", {
        users: users,
      });
    });
  });
});

app.post("/", bodyParser.urlencoded({ extended: true }), (req, res, next) => {
  mongoose.connect(url, (err) => {
    console.log("connected To DataBase");
    let newUser = User({
      name: req.body.name,
      age: req.body.age,
    });
    newUser.save((err, result) => {
      console.log(result);
      mongoose.disconnect();
      res.redirect("/");
    });
  });
});

app.listen(3000, () => console.log("server is listen on port 3000"));
