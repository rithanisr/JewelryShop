const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const productRoutes = require("./router/productroutes");
const userRoutes = require("./router/userroutes");
const cartRoutes = require("./router/cartroutes");
const orderRoutes = require("./router/orderroutes");

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => console.log("❌ MongoDB Error:", err));

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

app.get("/", (req, res) => {
  res.json({ message: "🌟 Jewellery E-commerce API Running" });
});

app.listen(5000, () => {
  console.log("🚀 Server running on port 5000");
});
