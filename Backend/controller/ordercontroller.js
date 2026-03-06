const Order = require("../models/order");
const Cart = require("../models/cart");

exports.createOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { address, phoneNumber } = req.body;

    if (!address || !phoneNumber) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Please provide address and phone number",
        });
    }

    const cartItems = await Cart.find({ userId }).populate("productId");

    if (cartItems.length === 0) {
      return res.status(400).json({ success: false, message: "Cart is empty" });
    }

    let total = 0;
    const products = cartItems.map((item) => {
      total += item.productId.price * item.quantity;
      return {
        productId: item.productId._id,
        quantity: item.quantity,
        price: item.productId.price,
      };
    });

    const order = new Order({
      userId,
      products,
      total,
      address,
      phoneNumber,
    });

    await order.save();
    await Cart.deleteMany({ userId });

    res
      .status(201)
      .json({
        success: true,
        message: "Order created successfully",
        data: order,
      });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await Order.find({ userId }).populate("products.productId");

    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId).populate("products.productId");

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    res.status(200).json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    if (
      !status ||
      !["Pending", "Processing", "Shipped", "Delivered"].includes(status)
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid status" });
    }

    const order = await Order.findByIdAndUpdate(
      orderId,
      { status, updatedAt: Date.now() },
      { new: true },
    );

    res.status(200).json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findByIdAndDelete(orderId);

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
