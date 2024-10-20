import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import mongoose from 'mongoose';

const User = mongoose.model('users');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: 'https://replit-prac-ppgd.onrender.com/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done) => {
      consol.log(profile);
      new User({ googleId: profile.id }).save();
    }
  )
);