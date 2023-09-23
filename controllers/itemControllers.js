const Item = require("../models/Item");

//Function to get all the items 
//and arrange them in decreasing order by the date added
module.exports.get_items = (req, res) => {
  Item.find()
    .sort({ date: -1 })
    .then((items) => res.json(items));
};

//Function to add new item to the cart

//We will use the request’s body as the input for the new item 
//since we are sending the request body from frontend in the same format as in our model.
module.exports.post_item = (req, res) => {
  const newItem = new Item(req.body);
  newItem.save().then((item) => res.json(item));
};

//Function to update items

//We receive updated information through the request body 
//and the item id through the params
//We will use the function findByIdAndUpdate to search for the item and update it with the new information
module.exports.update_item = (req, res) => {
  Item.findByIdAndUpdate({ _id: req.params.id }, req.body).then(function (
    item
  ) {
    Item.findOne({ _id: req.params.id }).then(function (item) {
      res.json(item);
    });
  });
};

//Function to delete items

//We receive the item id through the params
//Next, we find the item and delete it using the findByIdAndDelete function
module.exports.delete_item = (req, res) => {
  Item.findByIdAndDelete({ _id: req.params.id }).then(function (item) {
    res.json({ success: true });
  });
};
