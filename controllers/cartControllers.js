//This controller file would handle all the logic for the cart.
//It would handle adding items to the cart, deleting items from the cart
//and getting the cart items to display along with the total cost

const Cart = require("../models/Cart");
const Item = require("../models/Item");

module.exports.get_cart_item = async (req, res) => {
  //We will get the user id of the user whose cart we want to access
  const userId = req.params.id;
  try {
    //we would try to search for a cart with that username
    let cart = await Cart.findOne({ userId });

    // If we find a cart with that username and the cart has non-zero items in it,
    //i.e. the cart is non-empty, then we would return the cart;
    //otherwise, we would return null
    if (cart && car.items.length > 0) {
      res.send(cart);
    } else {
      res.send(null);
    }
  } catch (error) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
};

module.exports.add_cart_item = async (req, res) => {

    //we receive the userId by params
    //we also receive the productId and the quantity via the request body
    const userId = req.params.id;
    //we also receive the productId and the quantity via the request body
    //we need productId to find the item to add to the cart
    const {product, quantity} = req.body;

    try {
        
    } catch (error) {
        
    }
};
