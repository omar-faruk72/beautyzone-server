
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
require("dotenv").config();
const port = process.env.PORT || 5001;
const path = require("path");
connectDB();


const app = express();
app.use(bodyParser.json());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use(cookieParser());

app.use(cors({
  origin: "https://beautyzone-client.vercel.app", 
  credentials: true,               
}));



app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api", require("./routes/reviewRoutes"));


app.listen(port, () => {
  console.log(`Beauty-Zone listening on port ${port}`);
});

