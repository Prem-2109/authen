import jwt from "jsonwebtoken";
import userModel from "../models/usermodels.js";

const userAuth = async (req, res, next) => {
  try {
    // 🔍 Get token from cookies
    const token = req.cookies?.token;

    // ❌ No token
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorized, token missing"
      });
    }

    // ✅ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 🔍 Get user from DB
    const user = await userModel.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found"
      });
    }

    // ✅ Attach user to request
    req.user = user;
    next();

  } catch (error) {
    console.error("Auth middleware error:", error.message);

    return res.status(401).json({
      success: false,
      message: "Not authorized, invalid token"
    });
  }
};

export default userAuth;
