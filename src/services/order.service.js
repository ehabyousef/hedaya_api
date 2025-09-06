import Cart from "../models/Cart";
import Product from "../models/Products";

export const cleearCart = async (userID) => {
  await Cart.findOneAndUpdate({ user: userID, products: [] });
};

// update cart
export const updateCart = async (products, placeOrder) => {
  if (placeOrder) {
    for (const product of products) {
      await Product.findByIdAndUpdate(product.productId, {
        $inc: {
          availableItems: -product.quantity,
        },
      });
    }
  }
};
