import { model, Schema } from "mongoose";

const orderSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    products: [
      {
        _id: false,
        productId: { type: Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, min: 1 },
        name: String,
        itemPrice: Number,
        totalprice: Number,
      },
    ],
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: [
        "placed",
        "shipped",
        "delivered",
        "canceled",
        "refunded",
        "visa payed",
        "failed to pay",
      ],
      default: "placed",
    },
    payment: {
      type: String,
      enum: ["visa", "cash"],
      default: "cash",
    },
  },
  { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } }
);

export const orderModel = model("Order", orderSchema);
