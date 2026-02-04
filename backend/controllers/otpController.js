const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
};

// @desc    Send OTP to phone number
// @route   POST /api/otp/send
// @access  Public
exports.sendOTP = async (req, res) => {
    try {
        const { phone } = req.body;

        // Validate phone number
        if (!phone || phone.length !== 10 || !/^\d+$/.test(phone)) {
            return res.status(400).json({
                success: false,
                message: 'Please provide a valid 10-digit phone number'
            });
        }

        // Check if user exists
        let user = await User.findOne({ phone });

        if (!user) {
            // Create new user if doesn't exist
            user = await User.create({
                phone,
                name: `User_${phone}` // Default name
            });
            console.log(`✅ New user created for phone: ${phone}`);
        }

        // Generate OTP
        const otpCode = user.generateOTP();
        await user.save();

        // TODO: In production, send OTP via SMS service
        console.log(`📱 OTP for ${phone}: ${otpCode} (Valid for 10 minutes)`);

        res.json({
            success: true,
            message: 'OTP sent successfully',
            // FOR TESTING ONLY - Remove in production
            otp: otpCode,
            note: 'In production, OTP will be sent via SMS'
        });

    } catch (error) {
        console.error('❌ Send OTP Error:', error);
        
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: 'Phone number already registered'
            });
        }
        
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// @desc    Verify OTP and login
// @route   POST /api/otp/verify
// @access  Public
exports.verifyOTP = async (req, res) => {
    try {
        const { phone, otp } = req.body;

        // Validate input
        if (!phone || !otp) {
            return res.status(400).json({
                success: false,
                message: 'Please provide phone number and OTP'
            });
        }

        // Find user
        const user = await User.findOne({ phone });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found. Please request OTP first'
            });
        }

        // Verify OTP
        const isValidOTP = user.verifyOTP(otp);

        if (!isValidOTP) {
            return res.status(400).json({
                success: false,
                message: 'Invalid or expired OTP'
            });
        }

        // Clear OTP after successful verification
        user.clearOTP();
        await user.save();

        // Generate JWT token
        const token = generateToken(user._id);

        console.log(`✅ OTP verified for ${phone}. User logged in.`);

        res.json({
            success: true,
            message: 'Login successful',
            data: {
                _id: user._id,
                name: user.name,
                phone: user.phone,
                email: user.email,
                userType: user.userType,
                isPhoneVerified: user.isPhoneVerified,
                token: token
            }
        });

    } catch (error) {
        console.error('❌ Verify OTP Error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// @desc    Update user profile
// @route   PUT /api/otp/update-profile
// @access  Private
exports.updateProfile = async (req, res) => {
    try {
        const { name, email } = req.body;
        
        const user = await User.findById(req.user.id);
        
        if (name) user.name = name;
        if (email) user.email = email;
        
        await user.save();
        
        res.json({
            success: true,
            data: user
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};