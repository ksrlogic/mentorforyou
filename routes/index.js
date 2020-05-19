var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");

/* GET home page. */
router.get("/", function (req, res, next) {
  if (req.session.passport) {
    console.log("d");
    res.render("index", {
      logstatus: `${req.session.passport.user[0].username}님 환영합니다.  <a href="/auth/logout">logout</a>`,
    });
  } else {
    res.render("index", { logstatus: `<a href="/auth/login">login</a>` });
  }
});

module.exports = router;
