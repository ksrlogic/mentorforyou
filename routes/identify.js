var express = require("express");
var router = express.Router();
var session = require("express-session");
var passport = require("passport");
const MongoStore = require("connect-mongo")(session);
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var fs = require("fs");
const path = require("path");
var mysql = require("mysql");
const utf8 = require("utf8");

var app = express();

var connection = mysql.createConnection({
  host: "localhost",
  user: "ksrlogic",
  password: "fifa2035",
  database: "mentorforyou_userinfo",
  port: "3307",
});

connection.connect();

/* GET home page. */
router.get("/myinfo", function (req, res, next) {
  var userinfo = req.session.passport.user[0];
  console.log(userinfo);
  if (!req.session.passport) {
    res.redirect("/login");
  } else {
    connection.query(
      `SELECT * FROM user_info Where facebookToken = ${userinfo.facebookid}`,
      function (err, results) {
        if (err) throw err;
        //if he is menti
        else if (results[0]) {
          console.log(results[0]);
          var info = results[0];
          valueList = Object.values(info);
          var body = ``;
          for (i = 0; i < valueList.length; i++) {
            var description = `<h2> ${valueList[i]}<h2>`;
            body += description;
          }
          res.render("identify", {
            who: "멘티",
            info: body,
          });
        } else {
          connection.query(
            `SELECT * FROM mentor_info WHERE facebookID = ${userinfo.facebookid}`,
            function (err, results) {
              if (err) throw err;
              //if he is mentor
              else if (results[0]) {
                console.log("2", results[0]);
                var info = results[0];
                valueList = Object.values(info);
                var body = ``;
                for (i = 0; i < valueList.length; i++) {
                  if (i === 8) {
                    continue;
                  } else if (i === 10) {
                    continue;
                  }
                  var description = `<p> ${valueList[i]}<p>`;
                  body += description;
                }

                res.render("identify", {
                  who: "멘토",
                  info: body,
                });
              } else {
                //if he didn't resistered
                res.redirect("/users/lobby");
              }
            }
          );
        }
      }
    );
  }
});

module.exports = router;
