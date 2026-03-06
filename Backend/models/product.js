const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Please provide product name"] },
  price: { type: Number, required: [true, "Please provide price"] },
  category: { type: String },
  description: { type: String },
  image: { type: String },
  rating: { type: Number, default: 0, min: 0, max: 5 },
  stock: { type: Number, default: 0 },
  material: { type: String }, 
  weight: { type: String }, 
  purity: { type: String }, 
  dimensions: { type: String }, 
  gemstone: { type: String }, 
  metalFinish: { type: String },
  warranty: { type: String }, 
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Product", productSchema);
