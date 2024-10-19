//this is a modal class that will be used to store the user data
import mongoose from 'mongoose';

const {Schema}= mongoose;

const userSchema = new Schema({
  googleID: String
  
})

mongoose.model('users', userSchema);