const User = require("../models/User");
const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcrypt");

module.exports.signup = (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400).json({ msg: "Please enter all fields" });
  }

  User.findOne({ email }).then((User) => {
    if (User) return res.status(400).json({ msg: "User already exists" });
  });

  //Registering a new user into the system
  const newUser = new User({ name, email, password });

  //Create Salt and hash
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
      if (err) throw err;
      newUser.password = hash;
      newUser.save().then((user) => {
        //Creating a Signed JWToken to be stored in local storage
        jwt.sign(
          { id: user._id },
          congif.get("jwtsecret"),
          { expiresIn: 3600 },
          (err, token) => {
            if (err) throw err;
            //Send the token as a response along with the user details without the password
            res.json({
              token,
              user: {
                id: user._id,
                name: user.name,
                email: user.email,
              },
            });
          }
        );
      });
    });
  });
};

//Already registered users to log into our application
module.exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ msg: "Please enter all fields" });
  }

  //We will search for User in the database using the email
  User.findOne({ email }).then((User) => {
    if (!User) return res.status(400).json({ msg: " User does not exist" });

    //Validate Password
    bcrypt.compare(password, User.password).then((isMatch) => {
      if (!isMatch) {
        return res.status(400).json({ msg: "Invalid Credentials" });
      }

      jwt.sign(
        { id: User._id },
        config.get("jwtsecret"),
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({
            token,
            user: {
              id: User._id,
              name: User.name,
              email: User.email,
            },
          });
        }
      );
    });
  });
};

//get_user function ( It finds a user by its id and then returns the user without its password as the JSON response )
module.exports.get_user = (req, res) => {
  User.findById(req.User.id)
    .select("-password")
    .then((user) => res.json(user));
};
