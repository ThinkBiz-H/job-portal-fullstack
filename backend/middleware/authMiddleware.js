const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  let token;

  // Check header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token
      token = req.headers.authorization.split(" ")[1];

      // Verify
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user
      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        return res
          .status(401)
          .json({ success: false, message: "User not found" });
      }

      return next(); // ✅ STOP here if success
    } catch (error) {
      console.error("JWT Error:", error.message);

      return res
        .status(401)
        .json({ success: false, message: "Not authorized, token invalid" });
    }
  }

  // No token
  return res
    .status(401)
    .json({ success: false, message: "Not authorized, no token" });
};

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.userType)) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    next();
  };
};

module.exports = { protect, authorize };
