const express = require("express");
const router = express.Router();
const protect = require("../middleware/authmiddleware");
const {
  addToCart,
  getCart,
  updateCart,
  removeFromCart,
  clearCart,
} = require("../controller/cartcontroller");

router.post("/add", protect, addToCart);
router.get("/", protect, getCart);
router.put("/:cartId", protect, updateCart);
router.delete("/:cartId", protect, removeFromCart);
router.delete("/", protect, clearCart);

module.exports = router;
