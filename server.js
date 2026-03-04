const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
require("dotenv").config();
const port = process.env.PORT || 5001;
const path = require("path");

// ১. আগে ডাটাবেস কানেক্ট করুন
connectDB();

// ২. অ্যাপ ডিফাইন করুন (এটি সবার আগে থাকতে হবে)
const app = express();

// ৩. CORS কনফিগারেশন (অ্যাপ ডিফাইন করার পর)
const allowedOrigins = [
  "https://beautyzone-client.vercel.app",
  "https://beautyzone-client-git-main-hafsa-rashids-projects.vercel.app",
  /\.vercel\.app$/ 
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.some(o => typeof o === 'string' ? o === origin : o.test(origin))) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// ৪. প্রিফ্লাইট রিকোয়েস্ট হ্যান্ডেল (এটি মিডলওয়্যারের শুরুতেই থাকা ভালো)
app.options("*", cors());

// ৫. অন্যান্য মিডলওয়্যার
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// ৬. রুটস (Routes)
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api", require("./routes/reviewRoutes"));

// ৭. সার্ভার লিসেন
app.listen(port, () => {
  console.log(`Beauty-Zone listening on port ${port}`);
});