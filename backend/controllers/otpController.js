const User = require("../models/User");

/* ================= SEND OTP ================= */
exports.sendOTP = async (req, res) => {
  try {
    const { phone } = req.body;

    // Validate phone number
    if (!phone || phone.length !== 10 || !/^\d+$/.test(phone)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid 10-digit phone number",
      });
    }

    // User must be registered first
    const user = await User.findOne({ phone });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found. Please register first",
      });
    }

    // Generate OTP
    const otp = user.generateOTP();
    await user.save();

    // TODO: integrate SMS provider
    console.log(`📱 DEV OTP for ${phone}: ${otp}`);

    return res.json({
      success: true,
      message: "OTP sent successfully",
      // ⚠️ remove otp in production
      otp,
    });
  } catch (error) {
    console.error("❌ Send OTP Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/* ================= VERIFY OTP ================= */
exports.verifyOTP = async (req, res) => {
  try {
    const { phone, otp } = req.body;

    if (!phone || !otp) {
      return res.status(400).json({
        success: false,
        message: "Please provide phone number and OTP",
      });
    }

    const user = await User.findOne({ phone });

    if (!user || !user.verifyOTP(otp)) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired OTP",
      });
    }

    // ✅ Mark account verified
    user.isVerified = true;

    // ✅ Clear OTP
    user.clearOTP();

    await user.save();

    return res.json({
      success: true,
      message: "Account verified successfully. Please login.",
    });
  } catch (error) {
    console.error("❌ Verify OTP Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
  