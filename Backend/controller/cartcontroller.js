const Cart = require("../models/cart");
const Product = require("../models/product");

exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.id;

    if (!productId || !quantity) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Please provide productId and quantity",
        });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    let cartItem = await Cart.findOne({ userId, productId });

    if (cartItem) {
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
      cartItem = new Cart({ userId, productId, quantity });
      await cartItem.save();
    }

    res
      .status(201)
      .json({ success: true, message: "Added to cart", data: cartItem });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const cartItems = await Cart.find({ userId }).populate("productId");

    res.status(200).json({ success: true, data: cartItems });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateCart = async (req, res) => {
  try {
    const { cartId } = req.params;
    const { quantity } = req.body;

    if (quantity < 1) {
      return res
        .status(400)
        .json({ success: false, message: "Quantity must be at least 1" });
    }

    const cartItem = await Cart.findByIdAndUpdate(
      cartId,
      { quantity },
      { new: true },
    );

    res.status(200).json({ success: true, data: cartItem });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const { cartId } = req.params;
    await Cart.findByIdAndDelete(cartId);

    res.status(200).json({ success: true, message: "Item removed from cart" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.clearCart = async (req, res) => {
  try {
    const userId = req.user.id;
    await Cart.deleteMany({ userId });

    res.status(200).json({ success: true, message: "Cart cleared" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
