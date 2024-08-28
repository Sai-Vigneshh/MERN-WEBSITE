const jwt = require("jsonwebtoken");

const generateToken = (user) => {
   
    console.log("JWT_SECRET_KEY:", process.env.JWT_SECRET_KEY);

  try {
    return jwt.sign(
      {
        userId: user._id.toString(),
        email: user.email,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "30d",
      }
    );
  } catch (error) {
    console.error("Token Error: ", error);
    return null;
  }
};

module.exports = generateToken;
