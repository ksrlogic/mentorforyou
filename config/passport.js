var facebook = require("../passport/facebook");
module.exports = function (app, passport) {
  passport.use("facebook", facebook(app, passport));
};
