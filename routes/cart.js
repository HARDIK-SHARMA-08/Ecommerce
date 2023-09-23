const { Router } = require("express");
const cartController = require("../controllers/cartControllers");
const router = Router();


//get request which fetches all the items in the cart of a particular user
//user's id requesting his cart is passed along as a param. So, we find the user’s cart and return all the cart items.
router.get("/cart/:id", cartController.get_cart_item);

//post request to add an item to the cart
//It also has a param id to identify which user is adding the item to the cart, 
//and thus we can find his cart and add the item to his cart or create a new cart for him.
router.post("/cart/:id", cartController.add_cart_item);

//delete request, and it removes an item from the cart
//It takes in two params — userId and itemId. 
//userId is used to get the cart of that particular user, and itemId is used to search for that item and remove it from the car
router.delete("/cart/:userId/:itemId", cartController.delete_item);

module.exports = router;
