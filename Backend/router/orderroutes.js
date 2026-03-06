const express = require("express");
const router = express.Router();
const protect = require("../middleware/authmiddleware");
const {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
} = require("../controller/ordercontroller");

router.post("/create", protect, createOrder);
router.get("/", protect, getOrders);
router.get("/:orderId", protect, getOrderById);
router.put("/:orderId", protect, updateOrderStatus);
router.delete("/:orderId", protect, deleteOrder);

module.exports = router;
