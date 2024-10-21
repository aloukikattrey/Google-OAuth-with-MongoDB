const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const cookieSession = require('cookie-session');


require('./models/User');
require('./services/passport');

const app = express();

app.use(
  cookieSession({
    maxAge :30*24*60*60*1000, //30 days into millisecs
    keys: [process.env.cookieKey]
  })
)
app.use(passport.initialize());
app.use(passport.session())

const MONGODB_URI = process.env.mongoURI;

// Connect to MongoDB
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB error:', err));


require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT);