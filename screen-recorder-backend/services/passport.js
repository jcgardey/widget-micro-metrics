const keys = require('../config/keys');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');

const User = mongoose.model('users');

//Siempre que avisar a passport que se termino
//la operacion. done(error, resultado)

//Serialize: Pasar el mongoose model a un ID
passport.serializeUser((user, done) => {
  //user.id is the autoincremental id generated for this user by mongodb
  //it's different from the google auth id
  done(null, user.id);
});

//Deserialize: Pasar de un id al mongoose model
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

//console.developers.google.com
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      scope: ['profile', 'email'],
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id });

      if (existingUser) {
        done(null, existingUser);
      }

      const user = await new User({ googleId: profile.id }).save();
      done(null, user);

    }
  )
);
