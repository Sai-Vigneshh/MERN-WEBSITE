const express = require("express");
const app = express();
const authrout=require("./routes/auth-route")
app.use(express.json());
const connectDb = require("./utils/db");
require('dotenv').config();
const cors = require("cors");
const errorMiddleware = require("./middlewares/error-middleware");
const contactRoute = require("./routes/contact-route");
const serviceRoute=require("./routes/service-route")
const adminRoute=require("./routes/admin-route")

const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials: true,
};

app.use(cors(corsOptions));
app.use("/api/auth",authrout) 
app.use("/api/form", contactRoute);
app.use("/api/data",serviceRoute);
app.use("/api/admin",adminRoute)

app.use(errorMiddleware);
PORT=3000
connectDb().then(() => {
    app.listen(PORT, () => {
      console.log(`server is running at port: ${PORT}`);
    });
  });