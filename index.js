import express from 'express';
import { connect } from 'mongoose';
import './models/User.js';
import './services/passport.js';

connect(process.env.mongoURI);

const app = express();

import authRoutes from './routes/authRoutes.js';
authRoutes(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT);