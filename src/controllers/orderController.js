import expressAsyncHandler from "express-async-handler";
import Cart from "../models/Cart.js";
import Product from "../models/Products.js";
import { orderModel } from "../models/order.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET); // ensure STRIPE_SECRET_KEY in .env

export const createOrder = expressAsyncHandler(async (req, res) => {
  const { payment, address, phone } = req.body;
  const cart = await Cart.findOne({ user: req.user.id });
  const products = cart?.products;
  if (products.length < 1) return new Error("Empty cart!");
  let orderProducts = [];
  let orderPrice = 0;
  for (let index = 0; index < products.length; index++) {
    const product = await Product.findById(products[index].id);
    if (!product)
      return new Error(`product ${products[i].productId} not found!`);
    if (!product.inStock(products[index].quantity)) {
      return new Error(
        `${product.name} out of stock, only ${product.availableItems} items are left`
      );
    }
    orderProducts.push({
      productId: product._id,
      quantity: products[index].quantity,
      name: product.name,
      itemPrice: product.finalPrice,
      totalprice: product.finalPrice * products[index].quantity,
    });
    orderPrice += product.finalPrice * products[index].quantity;
  }

  const order = await orderModel.create({
    user: req.user._id,
    products: orderProducts,
    address,
    phone,
    payment,
    price: orderPrice,
  });
  await order.save();
  if (payment === "visa") {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      metadata: {
        order_id: order._id.toString(),
        user_id: user._id.toString(),
      },
      mode: "payment",
      success_url: `${process.env.SUCCESS_URL}`,
      cancel_url: `${process.env.CANCEL_URL}`,
      customer_email: user.email,
      line_items: order.products.map((product) => ({
        price_data: {
          currency: "EGP",
          product_data: {
            name: product.name,
            description: `Quantity: ${product.quantity}`,
          },
          unit_amount: Math.round(product.itemPrice * 100),
        },
        quantity: product.quantity,
      })),
      expires_at: Math.floor(Date.now() / 1000) + 30 * 60, // 30 minutes
    });

    await order.save();

    return res.json({
      success: true,
      results: session.url,
      sessionId: session.id,
    });
  }
  return res.json({
    success: true,
    message: "order placed successfully!",
  });
});

export const webhook = expressAsyncHandler(async (req, res) => {
  const sig = request.headers["stripe-signature"];

  let event = stripe.webhooks.constructEvent(
    request.body,
    sig,
    process.env.STRIPE_WEBHOOK_SECRET
  );

  const orderId = event.data.object.metadata.order_id;
  switch (event.type) {
    case "checkout.session.completed":
      await orderModel.findByIdAndUpdate(orderId, {
        status: "paid",
        paymentIntentId: session.payment_intent,
        paidAt: new Date(),
      });
      break;

    case "checkout.session.expired":
      await orderModel.findByIdAndUpdate(orderId, {
        status: "payment_expired",
      });
      break;

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }
  res.json({ received: true });
});
