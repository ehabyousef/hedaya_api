import { model, Schema } from "mongoose";

const cartSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    products: [
      {
        _id: false,
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          min: [1, "can't be less than 1"],
          default: 1,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    totalPrice: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

cartSchema.methods.calculateTotalPrice = function () {
  this.totalPrice = this.products.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  return this.totalPrice;
};

const Cart = model("Cart", cartSchema);
export default Cart;
