var express = require("express");
var router = express.Router();
var session = require("express-session");
var passport = require("passport");
const MongoStore = require("connect-mongo")(session);
var mongoose = require("mongoose");

var app = express();

/* GET home page. */
router.get("/login", function (req, res, next) {
  res.render("login", {});
});
router.get("/logout", function (req, res, next) {
  req.session.passport = undefined;
  res.redirect("/");
});
router.get(
  "/facebook",
  passport.authenticate("facebook", {
    scope: "email",
  })
);
router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/",
    failureRedirect: "/auth/login",
  })
);
module.exports = router;
