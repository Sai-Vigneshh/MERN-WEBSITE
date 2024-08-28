const jwt =require("jsonwebtoken")
const User=require("../models/user-model")
const authMiddleware = async (req, res, next) => {
   
   
  
    const token = req.header("Authorization");
   
  
    if (!token) {
      console.log("No token provided");
      return res.status(401).json({ message: "Unauthorized: Token not provided" });
    }
  
    const jwtToken = token.replace("Bearer", "").trim();
    
    
    try {
     
      const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);
      
  
      const userData = await User.findOne({ email: isVerified.email }).select({ password: 0 });
  
      if (!userData) {
        console.log("User not found");
        return res.status(401).json({ message: "Unauthorized: User not found" });
      }
  
      req.token = token;
      req.user = userData;
      req.userID = userData._id;
  
      
  
      next();
    } catch (error) {
      console.error(`Auth middleware error: ${error.message}`);
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
};
  
module.exports = authMiddleware;
  