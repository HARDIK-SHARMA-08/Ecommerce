const {Router} = require('express');
const orderController =require('../controllers/orderControllers');
const router = Router();

//get request and fetches all the orders we have made till now in our application
//It accepts a param id which is the userId which helps us to return the correct user’s orders
router.get('/order/:id', orderController.get_orders);

//post request which also has a param id for finding the user
//Its function is to create a new folder
router.post('/order/:id', orderController.checkout);

module.exports = router;