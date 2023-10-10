import orderModel from "../models/orderModel.js";
import stripe from "stripe";

const stripeInstance = stripe(process.env.PRIVATE_API_KEY);

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

//Get Order
export const getOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ buyer: req.user._id })
      .populate("products")
      .populate("buyer", "name");
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting Order",
      error,
    });
  }
};

//Get all Orders
export const getAllOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({})
      .populate("products")
      .populate("buyer", "name")
      .sort({ createdAt: "-1" });
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting all Orders",
      error,
    });
  }
};

//Payment
export const paymentController = async (req, res) => {
  const amount = req.body;
  const paymentIntent = await stripe.paymentIntent.create({
    amount,
    currency: "INR",
  });
  res.status(200).json(paymentIntent.client_secret);
};
