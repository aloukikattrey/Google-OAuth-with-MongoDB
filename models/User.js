import mongoose from 'mongoose';
const {Schema}= mongoose;

//this is a modal class that will be used to store the user data
const userSchema = new Schema({
  googleID: String
})

mongoose.model('users', userSchema);