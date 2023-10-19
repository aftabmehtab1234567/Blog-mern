import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
   
  },
  password: {
    type: String,
    required: true,
  },
  image:{
    type: String,
    required: true,
  },
  created: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

// Define the User model
const User = mongoose.model('blog-1', userSchema);

export default User;
