var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
/* GET users listing. */
router.get("/register", function (req, res, next) {
  if (!req.session.passport) {
    res.redirect("/auth/login");
  } else {
    res.render("register");
  }
});

router.post("/register_process", function (req, res, next) {
  res.send("Got it ");
  console.log(req.body);
});
module.exports = router;
