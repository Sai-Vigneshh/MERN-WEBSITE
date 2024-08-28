
const mongoose = require("mongoose")

const connectDb = async () => {
    try {
      const URL=process.env.MONGODBURI
      console.log(URL)
      await mongoose.connect(URL);
      console.log("connection successful to DB");
    } catch (error) {
        console.log(error)
      console.error("database connection fail");
      process.exit(0);
    }
  };
  
  module.exports =connectDb;