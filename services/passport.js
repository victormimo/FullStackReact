const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../config/keys"); // ./ serves as current directory ie. server, and dont need to label js if its js ie keys vs keys.js
const mongoose = require("mongoose");

const User = mongoose.model("users"); //one argument means fetch out of mongoose. User is a model class

passport.use(
  new GoogleStrategy( // making new instance of object.this c ould also be done in another variable and put passed into Passport.use
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      //passport uses a callbackURL to bring userback. Therefore once theuser gives permission the app must have this route handler ready.
      //note: this url was arbritarily chosen not chosen by google, as long as on our google profile we have it allowed as a redirect url
      callbackURL: "/auth/google/callback",
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      //note profile is google.user  is mongodb
      const existingUser = await User.findOne({ googleID: profile.id });
      //existing user is predefinedby mongo
      // .then is a promise. wont always use since mongo is async
      if (existingUser) {
        return done(null, existingUser);
      }
      const user = await new User({ googleID: profile.id }).save(); // creates a new model instance
      //user is the new User object on callback... therefore useris the most up to date
      done(null, user);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id); //cookie
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => done(null, user)); //from cookie to user info
});
