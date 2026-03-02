
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const connectDB = require("./config/db");
require("dotenv").config();
const port = process.env.PORT || 5001;

connectDB();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());



app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Beauty-Zone listening on port ${port}`);
});

