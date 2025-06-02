import mongoose from 'mongoose';

// Schema For Creating Products
const ProductSchema = mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
    trim: true,
    minlength: [1, 'ID must be at least 1 character long'],
    maxlength: [10, 'ID must be at most 10 characters long'],
  },
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: [3, 'Name must be at least 3 characters long'],
    maxlength: [150, 'Name must be at most 100 characters long'],
  },
  image: {
    type: String,
    required: true,
    trim: true,
    match: [/^http:\/\/localhost:\d+\/images\/[a-zA-Z0-9_-]+\.(jpg|jpeg|png|gif)$/i, 'Please provide a valid image URL'],
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  new_price: {
    type: Number,
    required: true,
    trim: true,
  },
  old_price: {
    type: Number,
    required: true,
    trim: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  available: {
    type: Boolean,
    default: true,
  },

})

// Exporting Product Model
const Product = mongoose.model("products", ProductSchema);
export default Product;
