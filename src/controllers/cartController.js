import expressAsyncHandler from "express-async-handler";
import Product from "../models/Products.js";
import Cart from "../models/Cart.js";

export const addToCart = expressAsyncHandler(async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user.id;

  const product = await Product.findById(productId);

  if (!product) {
    res.status(404).json({ message: "product not found" });
  }

  let cart = await Cart.findOne({ user: userId });

  if (!cart) {
    cart = new Cart({
      user: userId,
      products: [
        {
          product: productId,
          quantity: quantity,
          price: product.price,
        },
      ],
    });
  } else {
    // Check if product already exists in cart
    const prodIndex = cart.products.findIndex(
      (x) => x.product.toString() === productId
    );

    if (prodIndex > -1) {
      // Update quantity if product exists
      cart.products[prodIndex].quantity =
        quantity || cart.products[prodIndex].quantity;
      +1;
    } else {
      // add new product to exist user cart
      cart.products.push({
        product: productId,
        quantity: quantity || 1,
        price: product.price,
      });
    }
  }

  cart.calculateTotalPrice();

  await cart.save();
  await cart.populate("products.product", "name price image");

  res
    .status(201)
    .json({ success: true, message: "prduct added to cart", result: cart });
});

export const getAllCart = expressAsyncHandler(async (req, res) => {
  const userId = req.user.id;

  const cart = await Cart.findOne({ user: userId }).populate(
    "products.product",
    "name price image"
  );

  if (!cart) {
    return res.status(200).json({
      success: true,
      message: "Cart is empty",
      data: { products: [], totalPrice: 0 },
    });
  }

  res.status(200).json({
    success: true,
    data: cart,
  });
});

export const removeFromCart = expressAsyncHandler(async (req, res) => {
  const { productId } = req.body;
  const userId = req.user.id;

  const cart = await Cart.findOne({ user: userId });
  if (!cart) {
    res.status(400).json({ message: "the cart is empty" });
  }

  cart.products = cart.products.filter(
    (item) => item.product.toString() !== productId
  );

  cart.calculateTotalPrice();

  await cart.save();

  res.status(200).json({
    success: true,
    message: "Product removed from cart",
    data: cart,
  });
});
