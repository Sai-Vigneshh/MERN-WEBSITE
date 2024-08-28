const User = require("../models/user-model");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/token"); 
const home = async (req, res) => {
  try {
    res.status(200).json({ msg: "Welcome to our home page" });
  } catch (error) {
    console.log(error);
  }
};

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log(req.body);

    // Check if the user already exists
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash the password
    const saltRound = 10;
    const hashpass = await bcrypt.hash(password, saltRound);

    // Create a new user
    const userCreated = await User.create({ username, email, password: hashpass });

    // Generate JWT token
    const token =userCreated.generateToken();
    //const token =userCreated.generateToken();

    // Send response
    res.status(201).json({
      msg: "Registration Successful",
      token: token,
      userId: userCreated._id.toString(),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const login=async (req,res) => {
    try{
    const {email,password}=req.body
    const userExist = await User.findOne({ email: email });
    if (!userExist) {
      return res.status(400).json({ msg: "Invalid Credintials" });
    }
    console.log(userExist.password)

    const match = await bcrypt.compare(password, userExist.password);
    if (match){
        res.status(200).json({
            message: "Login Successful",
            token: await userExist.generateToken(),
            userId: userExist._id.toString(),
          });
    }else{
        res.status(401).json({ message: "Invalid email or passord " });
    }
 }catch (error) {
        res.status(500).json({ message: "Internal server error" });
      }
}

const user = async (req, res) => {
  try {
    console.log("User route activated");
    const userData = req.user;

    if (!userData) {
      console.log("No user data found in request");
      return res.status(404).json({ message: "User not found" });
    }

    console.log("User data:", userData);
    return res.status(200).json({userData });
  } catch (error) {
    console.error(`Error from user route: ${error.message}`);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { user };

module.exports = { home, register,login ,user};
