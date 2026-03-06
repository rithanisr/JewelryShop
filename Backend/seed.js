const mongoose = require("mongoose");
const Product = require("./models/product");
const products = require("./seed/product");
require("dotenv").config();

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB Connected for Seeding");

    await Product.deleteMany();
    console.log("Existing products cleared");

    await Product.insertMany(products);
    console.log(`${products.length} Products Inserted Successfully`);

    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
}

seedDatabase();
