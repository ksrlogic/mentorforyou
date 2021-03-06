const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const FacebookStrategy = require("passport-facebook").Strategy;
const passport = require("passport");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongo = require("mongodb");
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const identifyRouter = require("./routes/identify");
const compression = require("compression");
const bodyParser = require("body-parser");

//DB CONNECT
mongoose.connect(
  "mongodb+srv://KSR:fifa2035@cluster0-pbtbp.mongodb.net/test?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);
//
var app = express();
//SESSION
app.use(
  session({
    secret: "@#@$MYSIGN#@$#$",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    ttl: 14 * 24,
  })
);
app.use(passport.initialize());
app.use(passport.session());
//Database
var userSchema = new Schema({
  username: String,
  facebookid: String,
  email: String,
  Authcode: String,
});
var User = mongoose.model("User", userSchema);
var db = mongoose.connection;
db.on("error", console.error);
db.once("open", function () {
  // CONNECTED TO MONGODB SERVER
  console.log("Connected to mongod server");
});

//
passport.serializeUser(function (account, done) {
  console.log("serser", account);
  done(null, account);
});

passport.deserializeUser(function (account, done) {
  User.find({ user: account }, function (err, account) {
    done(err, account);
  });
});

var facebookCredentials = require("./config/facebook.json");
facebookCredentials.profileFields = [
  "id",
  "email",
  "name",
  "displayName",
  "gender",
];
passport.use(
  "facebook",
  new FacebookStrategy(facebookCredentials, function (
    accessToken,
    refreshToken,
    profile,
    done
  ) {
    User.find({ facebookid: profile.id }, function (err, docs) {
      if (docs[0]) {
        console.log("already there!", profile.id);
        done(null, docs);
      } else {
        var account = new User({
          username: profile.displayName,
          facebookid: profile.id,
          email: profile.emails[0].value,
          Authcode: accessToken,
        });
        account.save();
        done(null, account);
      }
    });
  })
);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(compression());

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/auth", authRouter);
app.use("/identify", identifyRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});
//db

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
