const User = require("../models/User");
const jwt = require("jsonwebtoken");
const random_string = require("randomstring");

// creating a token using jwt to auth. And using a random string generator to generate random string as a secret, this expires in 3 days (this is an option that jwt provies).

const createToken = (_id) => {
  return jwt.sign({ _id }, random_string.generate(), { expiresIn: "3d" });
};

// login user

module.exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.status(200).json({ email, token }); 
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//sign up user

module.exports.signUpUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.signUp(email, password);
    // generating token using that function and passing the id as paramater.
    const token = createToken(user._id);
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
