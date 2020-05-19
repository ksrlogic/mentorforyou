/*const passport = require("passport");
const Localstrategy = require('passport-local').Strategy
const UserModel = require('../models/UserModel')
passport.use(new Localstrategy({ usernameField: 'email'}, async (username, password, done) => {
     try{
        const user = await UserModel.findOne({email: username}).exec();
        if(!user){
            return done(null, false, {message: 'Invalid username or password'})
        }
        const passwordOK = await user.comparePassword(password);
        if(!passwordOK){
            return done(null, false, { message: 'Invalid username or password'})
        }
        return done(null, user)
     } catch(err){
        return done(err);
     }
    }))
passport.serializeUser((user, done) => done(null, user._id))

passport.deserializeUser(async (id, done) =>{
    try{
        const user        
    }catch(err){

    }
})
module.exports = {
  initalize: passport.initialize(),
  session: passport.session(),
  setUser: (req, res, next) => {
    res.local.user = req.user;
    return next();
  },
};*/
