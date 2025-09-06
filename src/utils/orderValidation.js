import joi from "joi";

export const createOrderValidation = joi.object({
  // Optional address - Stripe will collect this
  address: joi.string().optional().allow("", null),
  // Optional phone - Stripe will collect this
  phone: joi.string().optional().allow("", null),

  // Only allow "visa" payment
  payment: joi.string().valid("visa").required(),
});
