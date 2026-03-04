const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // পাসওয়ার্ড এনকোড করা জরুরি কারণ এতে স্পেশাল ক্যারেক্টার থাকতে পারে
    const encodedPass = encodeURIComponent(process.env.DB_PASS);
   
    // এখানে ${process.env.DB_PASS} এর বদলে ${encodedPass} ব্যবহার করুন
    const uri = `mongodb+srv://${process.env.DB_USER}:${encodedPass}@cluster0.g65hyqn.mongodb.net/beautyzone?retryWrites=true&w=majority`;
    
    const conn = await mongoose.connect(uri);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    // ভেরসেলে process.exit(1) দিলে সার্ভার স্টপ হয়ে যায়, তাই ৫০০ এরর আসে
    // আপনি চাইলে শুধু কনসোল লগ দিয়ে রাখতে পারেন
  }
};

module.exports = connectDB;