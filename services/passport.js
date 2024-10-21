const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');

const User = mongoose.model('users');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: process.env.callbackURL
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let existingUser = await User.findOne({ googleId: profile.id });

        if (existingUser) {
          return done(null, existingUser);
        }

        const newUser = await new User(
          {
            googleId: profile.id,
            displayName: profile.displayName,
            email: profile.emails[0].value
          }
        ).save();
        done(null, newUser);
      } catch (error) {
        console.error('Error saving user: ', error);
        done(error, null);
      }
    }
  )
);
