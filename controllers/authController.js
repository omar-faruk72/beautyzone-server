const User = require("../models/auth.js");
const {
  generateAccessTokens,
  generateRefreshTokens,
} = require("../utils/generateTokens");
const bcrypt = require("bcryptjs");

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  const hased = await bcrypt.hash(password, 10);
  const user = await User.create({
    name,
    email,
    password: hased,
  });
  res.status(201).json({ message: "User created successfully" });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await user.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials" });
  }
  const accessToken = generateAccessTokens(user);
  const refreshToken = generateRefreshTokens(user);

  user.refreshToken = refreshToken;
  await user.save();
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
  });
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
  });
  res.json({ message: "Logged in successfully" });
};

exports.refreshToken = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const user = await user.findById(decoded.id);
    const newAccessToken = generateAccessTokens(user);
    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
    });
    res.json({ message: "Access token refreshed" });
  } catch (err) {
    return res.status(403).json({ message: "Forbidden" });
  }
};

exports.logout = async (req, res) => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  res.json({ message: "Logged out successfully" });
};
