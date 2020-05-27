var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var mysql = require("mysql");

var app = express();

var connection = mysql.createConnection({
  host: "localhost",
  user: "ksrlogic",
  password: "fifa2035",
  database: "mentorforyou_userinfo",
  port: "3307",
});

/* GET home page. */
router.get("/", function (req, res, next) {
  //session here!
  if (req.session.passport) {
    connection.query(
      `SELECT * FROM User_info WHERE facebookToken =
    ${req.session.passport.user[0].facebookid}`,
      function (error, results, fields) {
        if (error) throw error;
        else if (results[0]) {
          res.render("index", {
            logstatus: `${req.session.passport.user[0].username}님  <a href="/auth/logout">logout</a>`,
            myinfostatus: `<a href="/users/update">내 정보 수정하기</a>`,
          });
        } else {
          connection.query(
            `SELECT * FROM mentor_info Where facebookid = ${req.session.passport.user[0].facebookid}`,
            function (err, results, fields) {
              if (err) throw err;
              else if (results[0]) {
                res.render("index", {
                  logstatus: `${req.session.passport.user[0].username}님___<a href="/auth/logout">logout</a>`,
                  myinfostatus: `<a href="/users/mentor_update">내 정보 수정하기</a>`,
                });
              } else {
                res.render("index", {
                  logstatus: `${req.session.passport.user[0].username}님___<a href="/auth/logout">logout</a>`,
                  myinfostatus: `<a href="/users/lobby">내 정보 입력하기</a>`,
                });
              }
            }
          );
        }
      }
    );
  } //no session
  else {
    res.render("index", {
      logstatus: `<a href="/auth/login">login</a>`,
      myinfostatus: `<a href="/users/register">내 정보 입력하기</a>`,
    });
  }
});

router.get("/admin", function (req, res) {
  console.log(req.session.passport.user[0].facebookid);
  if (req.session.passport.user[0].facebookid == 137455701255370) {
    var body = "";
    connection.query(`SELECT * FROM mentor_info`, function (err, results) {
      console.log(results);
      for (i = 0; i < results.length; i++) {
        body += `<p style="margin: 10px">${Object.values(results[i])}</p>`;
      }
      res.render("admin", {
        user: body,
      });
    });
  } else {
    res.send("접근 권한이 없습니다.");
  }
});
router.get("/public", function (req, res) {});
module.exports = router;
