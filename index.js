const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');


require('./models/User');
require('./services/passport');

const app = express();

app.use(
  session({
    secret: 'yourSecretKey',
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});


// mongoose.connect(process.env.mongoURI);

const MONGODB_URI = process.env.mongoURI;

// Connect to MongoDB
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB error:', err));


require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT);