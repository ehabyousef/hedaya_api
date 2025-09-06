import expressAsyncHandler from "express-async-handler";
import Cart from "../models/Cart.js";
import Product from "../models/Products.js";
import { orderModel } from "../models/order.js";
import Stripe from "stripe";

// Safe Stripe initialization
const stripe = process.env.STRIPE_SECRET
  ? new Stripe(process.env.STRIPE_SECRET)
  : null;

export const createOrder = expressAsyncHandler(async (req, res) => {
  if (!stripe) {
    throw new Error("Stripe is not configured");
  }

  const { payment } = req.body;

  if (payment !== "visa") {
    throw new Error("Only visa payment is supported");
  }

  // Get user from auth middleware
  const userId = req.user?._id || req.user?.id;
  if (!userId) {
    throw new Error("User not authenticated");
  }

  // Get cart
  const cart = await Cart.findOne({ user: userId });
  const products = cart?.products || [];

  if (!products.length) {
    throw new Error("Your cart is empty");
  }

  // Process products
  let orderProducts = [];
  let orderPrice = 0;

  for (let index = 0; index < products.length; index++) {
    const product = await Product.findById(products[index].id);
    if (!product) {
      throw new Error(`Product not found`);
    }

    // Check stock (adjust based on your product schema)
    const qty = products[index].quantity;
    const available = product.availableItems || 0;

    if (available < qty) {
      throw new Error(
        `${product.name} out of stock, only ${available} items are left`
      );
    }

    orderProducts.push({
      productId: product._id,
      quantity: qty,
      name: product.name,
      itemPrice: product.finalPrice,
      totalprice: product.finalPrice * qty,
    });

    orderPrice += product.finalPrice * qty;
  }

  // Create order with placeholder address/phone - will be updated after checkout
  const order = await orderModel.create({
    user: userId,
    products: orderProducts,
    address: "Pending from Stripe", // Placeholder
    phone: "Pending from Stripe", // Placeholder
    payment: "visa",
    price: orderPrice,
    status: "placed", // Will be updated by webhook
  });

  try {
    // Create Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      shipping_address_collection: {
        // This collects shipping address
        allowed_countries: ["EG", "US", "CA", "GB"],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: { amount: 0, currency: "EGP" },
            display_name: "Free shipping",
          },
        },
      ],
      phone_number_collection: {
        // This collects phone number
        enabled: true,
      },
      metadata: {
        order_id: order._id.toString(),
        user_id: userId.toString(),
      },
      mode: "payment",
      success_url: `${process.env.SUCCESS_URL}`,
      cancel_url: `${process.env.CANCEL_URL}`,
      customer_email: req.user.email,
      line_items: orderProducts.map((product) => ({
        price_data: {
          currency: "EGP",
          product_data: {
            name: product.name,
            description: `Quantity: ${product.quantity}`,
          },
          unit_amount: Math.round(product.itemPrice * 100), // in cents
        },
        quantity: product.quantity,
      })),
      expires_at: Math.floor(Date.now() / 1000) + 30 * 60, // 30 minutes
    });

    return res.json({
      success: true,
      url: session.url, // Consistent property name
      sessionId: session.id,
      orderId: order._id,
    });
  } catch (error) {
    // If Stripe checkout creation fails, update order and rethrow
    await orderModel.findByIdAndUpdate(order._id, { status: "failed to pay" });
    throw new Error(`Payment processing failed: ${error.message}`);
  }
});

// Updated webhook to save address/phone from Stripe
export const webhook = expressAsyncHandler(async (req, res) => {
  if (!stripe) {
    return res.status(500).json({ error: "Stripe not configured" });
  }

  const sig = req.headers["stripe-signature"];

  try {
    const event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    const session = event.data.object;
    const orderId = session.metadata?.order_id;

    if (!orderId) {
      throw new Error("No order ID in metadata");
    }

    switch (event.type) {
      case "checkout.session.completed":
        // Extract shipping details from the session
        const shippingDetails = session.shipping_details;
        const shippingAddress = shippingDetails?.address
          ? `${shippingDetails.address.line1}, ${shippingDetails.address.city}, ${shippingDetails.address.country}`
          : "Address not provided";

        const phoneNumber =
          session.customer_details?.phone || "Phone not provided";

        // Update order with payment status and shipping details
        await orderModel.findByIdAndUpdate(orderId, {
          status: "visa payed",
          paymentIntentId: session.payment_intent,
          paidAt: new Date(),
          address: shippingAddress,
          phone: phoneNumber,
        });
        break;

      case "checkout.session.expired":
        await orderModel.findByIdAndUpdate(orderId, {
          status: "failed to pay",
        });
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    res.json({ received: true });
  } catch (err) {
    console.error(`Webhook error: ${err.message}`);
    return res.status(400).json({ error: `Webhook Error: ${err.message}` });
  }
});
