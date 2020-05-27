var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
var mysql = require("mysql");
const multer = require("multer");
const path = require("path");
var app = express();
var fs = require("fs");
const storage = multer.diskStorage({
  destination: "./public/authimages/",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname +
        "-" +
        req.session.passport.user[0].facebookid +
        path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).single("image");

//check
function checkFileType(file, cb) {
  // Allowed extension
  const filetypes = /jpeg|jpg|png|gif/;
  //check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // check mime
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("에러! : 이미지만 넣어주세요!");
  }
}

var connection = mysql.createConnection({
  host: "localhost",
  user: "ksrlogic",
  password: "fifa2035",
  database: "mentorforyou_userinfo",
  port: "3307",
});

connection.connect();

connection.query("SELECT facebookToken FROM User_info", function (
  error,
  results,
  fields
) {
  if (error) throw error;
});

var app = express();

var seperator = function (A) {
  if (typeof A === "string") {
    return A;
  } else if (typeof A === "object") {
    var join = A.join(" / ");
    return join;
  }
};

app.use(bodyParser.urlencoded({ extended: false }));
/* GET users listing. */
router.get("/lobby", function (req, res) {
  res.render("lobby");
});
router.get("/register", function (req, res, next) {
  if (!req.session.passport) {
    res.redirect("/auth/login");
  } else {
    connection.query(
      `SELECT * FROM User_info WHERE facebookToken =
    ${req.session.passport.user[0].facebookid}`,
      function (error, results, fields) {
        if (error) throw error;
        else if (!results[0]) {
          res.render("register");
        } else {
          res.send("정보가 이미 존재합니다.");
        }
      }
    );
  }
});

router.get("/mentor_register", function (req, res, next) {
  if (!req.session.passport) {
    res.redirect("/auth/login");
  } else {
    connection.query(
      `SELECT * FROM mentor_info WHERE facebookID =
     ${req.session.passport.user[0].facebookid}`,
      function (err, results, fields) {
        if (err) {
          res.render("error");
        } else {
          if (!results[0]) {
            res.render("mentor_register");
          } else {
            res.redirect("/");
          }
        }
      }
    );
  }
});
//mentor register process
router.post("/register_mentor_process", function (req, res, next) {
  upload(req, res, (err) => {
    if (err) {
      res.send(
        "파일에 이상이 있습니다! 혹시 사진이 아닌 지, 용량이 너무 큰 지 확인해주세요."
      );
    }
    if (!req.file) {
      res.render("error", { message: "file not exist!" });
    } else {
      var get = req.body;
      console.log(req.body);
      var sql = `INSERT INTO mentor_info(
        name,
        KakaoTalkID,
        School,
        univ_class,
        Class,
        Selected,
        Gender,
        Strategy,
        image,
        selfIntroduction,
        facebookID)
    
        values(
        '${get.FullName}',
        '${get.KakaoTalkID}',
        '${get.University}',
        '${get.Univ_Class}',
        '${get.class}',
        '${seperator(get.Selected)}',
        '${get.Gender}',
        '${seperator(get.Strategy)}',
        '${req.file.destination + req.file.filename}',
        '${get.SelfIntroduction}',
        '${req.session.passport.user[0].facebookid}')`;
      connection.query(sql, function (err, results, fields) {
        if (err) throw err;
        process.emit("added");
        res.render("success");
      });
    }
  });
});
//UPDATE ROUTING
router.get("/update", function (req, res, next) {
  var Him = req.session.passport.user[0];
  connection.query(
    `SELECT * FROM User_info Where facebookToken = ${Him.facebookid}`,
    function (error, results) {
      if (error) throw error;
      console.log(results[0].FullName);
      var info = results[0];
      res.render("update", {
        name: `${info.FullName}`,
        email: `${info.email}`,
        kakaotalkID: `${info.KakaoTalkID}`,
        Score: `${info.Score}`,
      });
    }
  );
});
router.get("/mentor_update", function (req, res, next) {
  var Him = req.session.passport.user[0];
  connection.query(
    `SELECT * FROM mentor_info Where facebookID = ${Him.facebookid}`,
    function (error, results) {
      if (error) {
        res.render("error");
      }
      var info = results[0];
      console.log(info);
      res.render("mentor_register", {
        action: "mentor_update_process",
        name: info.name,
        KakaoTalkID: info.KakaoTalkID,
        University: info.School,
        Univ_Class: info.univ_class,
      });
    }
  );
});

router.post("/mentor_update_process", function (req, res, next) {
  connection.query(
    `SELECT * FROM mentor_info WHERE facebookID = ${req.session.passport.user[0].facebookid}`,
    function (err, results) {
      if (err) throw err;
      var info = results[0];
      fs.unlink(`${info.image}`, function () {
        upload(req, res, (err) => {
          if (err) {
            res.render("error", { message: err });
          }
          if (!req.file) {
            res.render("error", { message: "file not exist!" });
          } else {
            var get = req.body;
            var Him = req.session.passport.user[0];
            var sql = `UPDATE Mentor_info SET

        name="${get.FullName}",
        KakaoTalkID="${get.KakaoTalkID}",
        School="${get.University}",
        univ_class="${get.Univ_Class}",
        Selected="${seperator(get.Selected)}",
        Gender="${get.Gender}",
        Strategy="${seperator(get.Strategy)}",
        image="${req.file.destination + req.file.filename}",
        SelfIntroduction="${get.SelfIntroduction}"

        WHERE facebookID = ${Him.facebookid}`;

            connection.query(sql, function (error, results) {
              if (error) {
                res.render("error", {
                  message: error,
                });
              } else {
                res.redirect("/users/success");
              }
            });
          }
        });
      });
    }
  );
});

router.post("/update_process", function (req, res, next) {
  var get = req.body;
  var Him = req.session.passport.user[0];
  var sql = `UPDATE User_info SET

  FullName="${get.FullName}",
  email="${get.email}",
  KakaoTalkID="${get.KakaoTalkID}",
  Score="${get.Score}",
  class="${get.class}",
  Selected="${seperator(get.Selected)}",
  RelativeGrade="${seperator(get.RelativeGrade)}",
  Test_origin_score="${seperator(get.Test_origin_score)}",
  Gender="${get.Gender}",
  Strategy="${seperator(get.Strategy)}",
  univ="${seperator(get.univ)}",
  SelfIntroduction="${get.SelfIntroduction}"

  WHERE facebookToken = ${Him.facebookid}`;

  connection.query(sql, function (error, results) {
    if (error) throw error;
    res.redirect("/users/success");
  });
});

router.post("/register_process", function (req, res, next) {
  var get = req.body;
  var sql = `INSERT INTO User_info(
    FullName,
    email,
    KakaoTalkID,
    Score,
    class,
    Selected,
    RelativeGrade,
    Test_origin_score,Gender,
    Strategy,
    univ,
    SelfIntroduction,
    created,
    facebookToken)

    values(
    '${get.FullName}',
    '${get.email}',
    '${get.KakaoTalkID}',
    '${get.Score}',
    '${get.class}',
    '${seperator(get.Selected)}',
    '${get.RelativeGrade.join(" / ")}',
    '${get.Test_origin_score.join(" / ")}',
    '${get.Gender}',
    '${seperator(get.Strategy)}',
    '${seperator(get.univ)}',
    '${get.SelfIntroduction}',
     NOW(),
    '${req.session.passport.user[0].facebookid}')`;
  connection.query(sql, function (error, results) {
    if (error) throw error;
    console.log(results);
    res.redirect("/users/success");
  });
});

router.get("/success", function (req, res) {
  res.render("success");
});
module.exports = router;
