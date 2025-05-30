import mongoose from 'mongoose';

// Schema creating For User Model
const AdminSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'username is required'],
    trim: true,
    minlength: [3, 'Name must be at least 3 characters long'],
    maxlength: [50, 'Name must be at most 50 characters long'],
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Email is required'],
    lowercase: true,
    trim: true,
    match: [/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/, 'Please fill a valid email address'],
  },
  password:{
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long'],
    maxlength: [1024, 'Password must be at most 1024 characters long'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
})

// Exporting User Model
const Admins = mongoose.model('Admins', AdminSchema);
export default Admins;