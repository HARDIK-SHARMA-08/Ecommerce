const { Router } = require("express");
const itemController = require("../controllers/itemControllers");
const router = Router();

//This route is a get request, and the purpose of this route is to fetch all the items from the server.
router.get("/items", itemController.get_items);

//This route is a post request to add a new item to the database.
router.post("/items", itemController.post_item);

//This route is a put request. Its purpose is to update an existing item in the database.
router.put("/items/:id", itemController.update_item);

//This route is a delete request to delete an item from the database.
router.delete("/items/:id", itemController.delete_item);

module.exports = router;
