const FacebookStrategy = require("passport-facebook").Strategy;
var config = require("../config");
console.log(config);
module.exports = function (app, passport) {
  return new FacebookStrategy(
    {
      clientID: config.facebook.clientID,
      clientSecret: config.facebook.clientSecret,
      callbackURL: config.facebook.callbackURL,
    },
    function (accessToken, refreshToken, profile, done) {
      console.log(" 패스포트의 페이스북 호출됨");
      console.dir(profile);

      var options = {
        criteria: { "facebook.id": profile.id },
      };
      var database = app.get("database");
      database.UserModel.load(options, function (err, user) {
        if (err) return done(err);
        if (!user) {
          var user = new database.UserModel({
            name: profile.displayName,
            email: profile.emails[0].value,
            provider: "facebook",
            facebook: profile._json,
          });
          user.save(function (err) {
            if (err) console.log(err);
            return done(err, user);
          });
        } else {
          return done(err, user);
        }
      });
    }
  );
};
