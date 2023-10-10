import orderModel from "../models/orderModel.js";

//Checkout
export const checkoutController = async (req, res) => {
  try {
    if (!req.user) {
        return res.status(401).json({
          success: false,
          message: "Authentication required",
        });
      }
    const { cart } = req.body;
    const buyerId = req.user._id;
    // Assuming the payment was successful (replace this with your actual logic)
    const order = await new orderModel({
      products: cart,
      payment: {
        /* Replace with your successful payment data */
      },
      buyer: buyerId,
    }).save();
    res.status(201).send({
      success: true,
      message: "Order Placed",
      order,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};
